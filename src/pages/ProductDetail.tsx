import { ChevronLeft, Package, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { QuantitySelector } from "../components/QuantitySelector";
import { SmartImage } from "../components/SmartImage";
import { useCart } from "../context/CartContext";
import { getFamily, getProductBySlug, imageUrl, products } from "../data/products";
import { maxQuantity } from "../lib/cart";
import { formatBRL } from "../lib/money";
import { usePageMeta } from "../lib/usePageMeta";
import { NotFound } from "./NotFound";

export function ProductDetail() {
  const { slug = "" } = useParams();
  const product = getProductBySlug(slug);
  // key reinicia galeria/quantidade ao navegar entre produtos
  return product ? <ProductView key={product.id} slug={slug} /> : <NotFound />;
}

function ProductView({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)!;
  usePageMeta(product.name, `${product.name} — ${product.shortDescription}`);
  const { add, quantityOf } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  const family = getFamily(product.family);
  const inCart = quantityOf(product.id);
  const available = Math.max(0, maxQuantity(product) - inCart);
  const soldOut = product.stock === 0;
  const related = products.filter((p) => p.id !== product.id).sort((a, b) => Number(b.family === product.family) - Number(a.family === product.family)).slice(0, 3);

  const handleAdd = () => {
    add(product, Math.min(qty, available));
    setQty(1);
  };

  return (
    <div className="container-site pt-6 md:pt-10">
      <Link to="/produtos" className="mb-6 inline-flex min-h-11 items-center gap-1 text-sm text-muted hover:text-ink">
        <ChevronLeft size={16} /> Todas as fragrâncias
      </Link>

      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        {/* Galeria */}
        <div>
          <SmartImage key={active} src={imageUrl(product.images[active])} alt={`${product.name} — imagem ${active + 1} de ${product.images.length}`} loading="eager" className="aspect-[4/5] w-full rounded-soft" />
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-3" role="group" aria-label="Imagens do produto">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Ver imagem ${i + 1}`}
                  aria-current={active === i}
                  className={`w-20 overflow-hidden rounded-soft border-2 transition-colors ${active === i ? "border-olive" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <SmartImage src={imageUrl(img, 200)} alt="" className="aspect-square w-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="md:sticky md:top-24 md:self-start">
          <p className="eyebrow mb-3">{family.name}</p>
          <h1 className="text-5xl leading-none sm:text-6xl">{product.name}</h1>
          <p className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl">{formatBRL(product.priceCents)}</span>
            <span className="text-sm text-muted">{product.volumeMl} ml</span>
          </p>
          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>

          <dl className="mt-8 divide-y divide-sand-dark/60 border-y border-sand-dark/60 text-sm">
            {(
              [
                ["Saída", product.notes.top],
                ["Coração", product.notes.heart],
                ["Fundo", product.notes.base],
              ] as const
            ).map(([label, notes]) => (
              <div key={label} className="flex gap-4 py-3">
                <dt className="w-24 shrink-0 text-muted">{label}</dt>
                <dd>{notes.join(", ")}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-muted">Notas olfativas demonstrativas.</p>

          <div className="mt-8">
            {soldOut ? (
              <div className="rounded-soft bg-cream p-4 text-sm" role="status">
                <p className="font-medium">Indisponível no momento</p>
                <p className="mt-1 text-muted">Esta fragrância está sem estoque no protótipo.</p>
              </div>
            ) : available === 0 ? (
              <div className="rounded-soft bg-cream p-4 text-sm" role="status">
                Você já tem a quantidade máxima disponível na sacola.{" "}
                <Link to="/carrinho" className="underline underline-offset-4">Ver sacola</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <QuantitySelector value={Math.min(qty, available)} max={available} onChange={setQty} label="Quantidade" />
                <button type="button" className="btn-primary flex-1" onClick={handleAdd}>
                  Adicionar à sacola · {formatBRL(product.priceCents * Math.min(qty, available))}
                </button>
              </div>
            )}
            {!soldOut && product.stock <= 5 && <p className="mt-3 text-sm text-earth">Últimas {product.stock} unidades no protótipo.</p>}
            {inCart > 0 && (
              <p className="mt-3 text-sm text-muted">
                {inCart} na sacola · <Link to="/carrinho" className="text-ink underline underline-offset-4">finalizar compra</Link>
              </p>
            )}
          </div>

          <ul className="mt-8 space-y-3 text-sm text-muted">
            <li className="flex gap-3"><Package size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-olive" aria-hidden /> Entrega para todo o Brasil — prazos e valores a definir (informação provisória).</li>
            <li className="flex gap-3"><RefreshCw size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-olive" aria-hidden /><span>Trocas e devoluções conforme a <Link to="/politicas#trocas" className="text-ink underline underline-offset-4">política da loja</Link> (provisória).</span></li>
          </ul>
        </div>
      </div>

      <section className="mt-24" aria-labelledby="relacionados">
        <h2 id="relacionados" className="mb-8 text-3xl sm:text-4xl">Você também pode gostar</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
