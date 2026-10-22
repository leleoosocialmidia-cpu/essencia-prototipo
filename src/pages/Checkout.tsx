import { Check, Loader2, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Field } from "../components/Field";
import { SmartImage } from "../components/SmartImage";
import { useCart } from "../context/CartContext";
import { imageUrl } from "../data/products";
import { formatBRL } from "../lib/money";
import { usePageMeta } from "../lib/usePageMeta";
import { maskCep, maskPhone, UFS, validateAddress, validateContact, type Errors } from "../lib/validation";
import { getShippingOptions, paymentMethods, submitOrder, type CustomerData, type PaymentMethodId } from "../services/checkout";

const steps = ["Contato", "Entrega", "Pagamento"];

const emptyCustomer: CustomerData = { name: "", email: "", phone: "", cep: "", street: "", number: "", complement: "", district: "", city: "", state: "" };

export function Checkout() {
  usePageMeta("Checkout");
  const cart = useCart();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(emptyCustomer);
  const [errors, setErrors] = useState<Errors>({});
  const shippingOptions = getShippingOptions(cart.totalCents);
  const [shippingId, setShippingId] = useState(shippingOptions[0].id);
  const [payment, setPayment] = useState<PaymentMethodId>("pix");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [confirmation, setConfirmation] = useState<{ demoCode: string; totalCents: number; email: string } | null>(null);

  const shipping = shippingOptions.find((s) => s.id === shippingId)!;
  const grandTotal = cart.totalCents + shipping.priceCents;

  if (confirmation) return <Confirmation {...confirmation} />;

  if (cart.items.length === 0) {
    return (
      <div className="container-site py-24 text-center">
        <h1 className="text-5xl">Nada para finalizar</h1>
        <p className="mt-4 text-muted">Sua sacola está vazia.</p>
        <Link to="/produtos" className="btn-primary mt-8">Ver fragrâncias</Link>
      </div>
    );
  }

  const set = (key: keyof CustomerData) => (e: { target: { value: string } }) => {
    let value = e.target.value;
    if (key === "cep") value = maskCep(value);
    if (key === "phone") value = maskPhone(value);
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const fieldProps = (key: keyof CustomerData) => ({ id: key, value: data[key], onChange: set(key), error: errors[key] });

  const next = async (e: FormEvent) => {
    e.preventDefault();
    const found = step === 0 ? validateContact(data) : step === 1 ? validateAddress(data) : {};
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    if (step < 2) {
      setStep(step + 1);
      window.scrollTo({ top: 0 });
      return;
    }
    setStatus("sending");
    try {
      const res = await submitOrder({ customer: data, items: cart.items, shipping, payment, totalCents: grandTotal });
      setConfirmation({ ...res, email: data.email });
      cart.clear();
      window.scrollTo({ top: 0 });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container-site pt-8 md:pt-12">
      <h1 className="text-5xl">Checkout</h1>
      <p className="mt-2 text-sm text-earth">Demonstração: nenhum pagamento é processado e nenhum dado é enviado.</p>

      <ol className="my-8 flex gap-2 text-sm" aria-label="Etapas">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col gap-2" aria-current={i === step ? "step" : undefined}>
            <span className={`h-0.5 ${i <= step ? "bg-olive" : "bg-sand-dark"}`} />
            <span className={i === step ? "text-ink" : "text-muted"}>
              {i < step ? <Check size={14} className="mr-1 inline" aria-label="concluída" /> : `${i + 1}. `}
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
        <form onSubmit={next} noValidate className="space-y-5">
          {step === 0 && (
            <fieldset className="space-y-5">
              <legend className="mb-2 font-serif text-3xl">Seus dados</legend>
              <Field label="Nome completo" autoComplete="name" {...fieldProps("name")} />
              <Field label="E-mail" type="email" autoComplete="email" inputMode="email" {...fieldProps("email")} />
              <Field label="Telefone (com DDD)" type="tel" autoComplete="tel" inputMode="tel" placeholder="(00) 00000-0000" {...fieldProps("phone")} />
            </fieldset>
          )}

          {step === 1 && (
            <>
              <fieldset className="grid grid-cols-6 gap-4">
                <legend className="mb-2 font-serif text-3xl">Endereço de entrega</legend>
                <Field className="col-span-6 sm:col-span-3" label="CEP" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" {...fieldProps("cep")} />
                <Field className="col-span-6" label="Endereço" autoComplete="address-line1" {...fieldProps("street")} />
                <Field className="col-span-2" label="Número" {...fieldProps("number")} />
                <Field className="col-span-4" label="Complemento" optional autoComplete="address-line2" {...fieldProps("complement")} error={undefined} />
                <Field className="col-span-6 sm:col-span-3" label="Bairro" {...fieldProps("district")} />
                <Field className="col-span-4 sm:col-span-2" label="Cidade" autoComplete="address-level2" {...fieldProps("city")} />
                <Field className="col-span-2 sm:col-span-1" id="state" label="UF" error={errors.state}>
                  <select id="state" className="input px-2" value={data.state} onChange={set("state")} aria-invalid={!!errors.state} aria-describedby={errors.state ? "state-erro" : undefined} autoComplete="address-level1">
                    <option value="">—</option>
                    {UFS.map((uf) => <option key={uf}>{uf}</option>)}
                  </select>
                </Field>
              </fieldset>

              <fieldset className="pt-4">
                <legend className="mb-3 font-serif text-3xl">Entrega</legend>
                <div className="space-y-2">
                  {shippingOptions.map((s) => (
                    <label key={s.id} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-soft border p-4 ${shippingId === s.id ? "border-olive bg-cream" : "border-sand-dark"}`}>
                      <input type="radio" name="shipping" value={s.id} checked={shippingId === s.id} onChange={() => setShippingId(s.id)} className="accent-olive" />
                      <span className="flex-1">
                        <span className="block text-sm">{s.label}</span>
                        <span className="text-xs text-muted">{s.eta}</span>
                      </span>
                      <span className="text-sm">{s.priceCents ? formatBRL(s.priceCents) : "Grátis"}</span>
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted">Valores e prazos demonstrativos — o cálculo real virá da integração de frete.</p>
              </fieldset>
            </>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="mb-3 font-serif text-3xl">Pagamento</legend>
              <div className="space-y-2">
                {paymentMethods.map((m) => (
                  <label key={m.id} className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-soft border p-4 ${payment === m.id ? "border-olive bg-cream" : "border-sand-dark"}`}>
                    <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} className="mt-1 accent-olive" />
                    <span>
                      <span className="block text-sm">{m.label}</span>
                      <span className="text-xs text-muted">{m.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-6 rounded-soft bg-cream p-4 text-sm">
                <p className="font-medium">Entregar para</p>
                <p className="mt-1 text-muted">
                  {data.name} · {data.street}, {data.number}
                  {data.complement && ` – ${data.complement}`} · {data.district} · {data.city}/{data.state} · CEP {data.cep}
                </p>
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted">
                <Lock size={14} aria-hidden /> Protótipo: nenhuma cobrança será feita e nenhum dado de pagamento é solicitado.
              </p>
            </fieldset>
          )}

          {status === "error" && <p role="alert" className="text-sm text-danger">Não foi possível concluir o pedido de demonstração. Tente novamente.</p>}

          <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-between">
            {step > 0 ? (
              <button type="button" className="btn-ghost" onClick={() => setStep(step - 1)}>Voltar</button>
            ) : (
              <Link to="/carrinho" className="btn-ghost">Voltar à sacola</Link>
            )}
            <button type="submit" className="btn-primary sm:min-w-56" disabled={status === "sending"}>
              {status === "sending" ? (
                <><Loader2 size={16} className="animate-spin" aria-hidden /> Enviando…</>
              ) : step < 2 ? (
                "Continuar"
              ) : (
                "Concluir pedido de demonstração"
              )}
            </button>
          </div>
        </form>

        <aside className="h-fit rounded-soft bg-cream p-6 lg:sticky lg:top-24" aria-labelledby="resumo-pedido">
          <h2 id="resumo-pedido" className="text-2xl">Resumo do pedido</h2>
          <ul className="mt-5 space-y-4">
            {cart.items.map(({ product, quantity, subtotalCents }) => (
              <li key={product.id} className="flex items-center gap-3 text-sm">
                <SmartImage src={imageUrl(product.images[0], 160)} alt="" className="h-16 w-13 shrink-0 rounded-soft" />
                <span className="flex-1">
                  {product.name}
                  <span className="block text-xs text-muted">{quantity} × {formatBRL(product.priceCents)}</span>
                </span>
                <span>{formatBRL(subtotalCents)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-sand-dark pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal ({cart.totalUnits} un.)</dt><dd>{formatBRL(cart.totalCents)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">{shipping.label}</dt><dd>{shipping.priceCents ? formatBRL(shipping.priceCents) : "Grátis"}</dd></div>
            <div className="flex justify-between pt-2 text-base font-medium"><dt>Total</dt><dd>{formatBRL(grandTotal)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function Confirmation({ demoCode, totalCents, email }: { demoCode: string; totalCents: number; email: string }) {
  return (
    <div className="container-site flex flex-col items-center py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/40 text-olive">
        <Check size={26} strokeWidth={1.5} aria-hidden />
      </span>
      <p className="eyebrow mt-6">Pedido de demonstração</p>
      <h1 className="mt-3 text-5xl">Obrigado por testar</h1>
      <p className="mt-5 max-w-md leading-relaxed text-muted">
        Este é um protótipo: <strong className="font-medium text-ink">nenhuma compra foi realizada</strong>, nenhum pagamento foi processado e nenhum e-mail foi enviado para {email}.
      </p>
      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-1 rounded-soft bg-cream px-8 py-5 text-left text-sm">
        <dt className="text-muted">Código fictício</dt><dd>{demoCode}</dd>
        <dt className="text-muted">Total simulado</dt><dd>{formatBRL(totalCents)}</dd>
      </dl>
      <Link to="/produtos" className="btn-primary mt-10">Voltar às fragrâncias</Link>
    </div>
  );
}
