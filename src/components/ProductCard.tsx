import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getFamily, imageUrl, type Product } from "../data/products";
import { maxQuantity } from "../lib/cart";
import { formatBRL } from "../lib/money";
import { SmartImage } from "./SmartImage";

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const { add, quantityOf } = useCart();
  const soldOut = product.stock === 0;
  const atLimit = quantityOf(product.id) >= maxQuantity(product);

  return (
    <article className="group flex flex-col">
      <Link to={`/produto/${product.slug}`} className="relative block overflow-hidden rounded-soft" aria-label={`Ver ${product.name}`}>
        <SmartImage
          src={imageUrl(product.images[0], 700)}
          alt={`Frasco da fragrância ${product.name}`}
          loading={eager ? "eager" : "lazy"}
          className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {soldOut && <span className="absolute top-3 left-3 rounded-soft bg-ivory/90 px-2.5 py-1 text-xs tracking-wide text-ink">Indisponível</span>}
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <p className="eyebrow mb-1">{getFamily(product.family).name}</p>
        <h3 className="text-2xl leading-tight">
          <Link to={`/produto/${product.slug}`} className="hover:text-olive">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{product.shortDescription}</p>
        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-end sm:justify-between">
          <p>
            <span className="block text-base font-medium">{formatBRL(product.priceCents)}</span>
            <span className="text-xs text-muted">{product.volumeMl} ml</span>
          </p>
          <button
            type="button"
            className="btn-secondary w-full px-4 sm:w-auto"
            disabled={soldOut || atLimit}
            onClick={() => add(product)}
            aria-label={soldOut ? `${product.name} indisponível` : `Adicionar ${product.name} à sacola`}
          >
            {soldOut ? "Esgotado" : atLimit ? "Limite" : "Adicionar"}
          </button>
        </div>
      </div>
    </article>
  );
}
