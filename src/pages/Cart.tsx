import { ArrowRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { QuantitySelector } from "../components/QuantitySelector";
import { SmartImage } from "../components/SmartImage";
import { siteConfig } from "../config/siteConfig";
import { useCart } from "../context/CartContext";
import { imageUrl } from "../data/products";
import { maxQuantity } from "../lib/cart";
import { formatBRL } from "../lib/money";
import { usePageMeta } from "../lib/usePageMeta";

export function Cart() {
  usePageMeta("Sacola");
  const { items, totalCents, totalUnits, setQuantity, remove } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-site flex flex-col items-center py-24 text-center">
        <h1 className="text-5xl">Sua sacola está vazia</h1>
        <p className="mt-4 max-w-sm text-muted">Explore as fragrâncias e encontre aquela que combina com o seu momento.</p>
        <Link to="/produtos" className="btn-primary mt-8">
          Descobrir fragrâncias
        </Link>
      </div>
    );
  }

  const missingForFree = siteConfig.freeShippingThresholdCents - totalCents;

  return (
    <div className="container-site pt-8 md:pt-12">
      <h1 className="mb-8 text-5xl">Sacola</h1>
      <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
        <ul className="divide-y divide-sand-dark/60 border-y border-sand-dark/60" aria-label="Itens na sacola">
          {items.map(({ product, quantity, subtotalCents }) => (
            <li key={product.id} className="flex gap-4 py-5 sm:gap-6">
              <Link to={`/produto/${product.slug}`} className="w-20 shrink-0 sm:w-28">
                <SmartImage src={imageUrl(product.images[0], 300)} alt={product.name} className="aspect-[4/5] w-full rounded-soft" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <h2 className="text-2xl leading-tight">
                      <Link to={`/produto/${product.slug}`} className="hover:text-olive">{product.name}</Link>
                    </h2>
                    <p className="text-sm text-muted">{product.volumeMl} ml · {formatBRL(product.priceCents)} cada</p>
                  </div>
                  <p className="text-right font-medium" aria-label={`Subtotal ${formatBRL(subtotalCents)}`}>{formatBRL(subtotalCents)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <QuantitySelector size="sm" value={quantity} max={maxQuantity(product)} onChange={(q) => setQuantity(product, q)} label={`Quantidade de ${product.name}`} />
                  <button type="button" className="btn-ghost text-muted" onClick={() => remove(product.id)} aria-label={`Remover ${product.name} da sacola`}>
                    <Trash2 size={16} strokeWidth={1.5} /> <span className="hidden sm:inline">Remover</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-soft bg-cream p-6 lg:sticky lg:top-24" aria-labelledby="resumo">
          <h2 id="resumo" className="text-2xl">Resumo</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Itens ({totalUnits} {totalUnits === 1 ? "unidade" : "unidades"})</dt>
              <dd>{formatBRL(totalCents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Entrega</dt>
              <dd className="text-muted">calculada no checkout</dd>
            </div>
            <div className="flex justify-between border-t border-sand-dark pt-3 text-base font-medium">
              <dt>Total</dt>
              <dd>{formatBRL(totalCents)}</dd>
            </div>
          </dl>
          {missingForFree > 0 && (
            <p className="mt-4 text-xs text-muted">Faltam {formatBRL(missingForFree)} para entrega padrão grátis (regra demonstrativa).</p>
          )}
          <Link to="/checkout" className="btn-primary mt-6 w-full">
            Finalizar compra <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
          <Link to="/produtos" className="btn-ghost mt-2 w-full">
            Continuar comprando
          </Link>
        </aside>
      </div>
    </div>
  );
}
