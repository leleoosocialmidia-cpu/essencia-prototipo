import { Search, ShoppingBag, X } from "lucide-react";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { siteConfig } from "../config/siteConfig";
import { useCart } from "../context/CartContext";
import { families, products, type FamilyId } from "../data/products";
import { filterProducts, sortOptions, type SortId } from "../lib/catalog";
import { formatBRL } from "../lib/money";
import { usePageMeta } from "../lib/usePageMeta";

/**
 * Catálogo e landing page para quem chega pelo link da bio do Instagram.
 * Filtros vivem na URL (?q=&familia=&ordem=), então sobrevivem a recarregar e podem ser compartilhados.
 */
export function Products() {
  usePageMeta("Fragrâncias", `Todas as fragrâncias ${siteConfig.brandName}: pesquise, filtre por família olfativa e compre em poucos passos.`);
  const [params, setParams] = useSearchParams();
  const { totalUnits, totalCents } = useCart();

  const query = params.get("q") ?? "";
  const familyParam = params.get("familia");
  const family = families.some((f) => f.id === familyParam) ? (familyParam as FamilyId) : null;
  const sortParam = params.get("ordem") as SortId | null;
  const sort: SortId = sortOptions.some((o) => o.id === sortParam) ? sortParam! : "destaque";

  const result = useMemo(() => filterProducts(products, { query, family, sort }), [query, family, sort]);
  const hasFilters = !!query || !!family || sort !== "destaque";

  // Lê a URL atual (não o valor da última renderização) para não perder um filtro em mudanças seguidas.
  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(window.location.search);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const chip = (active: boolean) =>
    `min-h-10 shrink-0 rounded-full border px-4 text-sm transition-colors ${active ? "border-olive bg-olive text-ivory" : "border-sand-dark text-ink hover:border-ink"}`;

  return (
    <div className="container-site pt-6 pb-12 md:pt-12">
      <header className="mb-5 md:mb-10">
        <p className="eyebrow mb-2 hidden sm:block">{siteConfig.tagline}</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl">Fragrâncias</h1>
      </header>

      {/* Controles */}
      <div className="mb-6 space-y-3 md:mb-8">
        <div className="flex gap-2 sm:gap-3">
          <div className="relative flex-1">
            <label htmlFor="busca" className="sr-only">Pesquisar por nome</label>
            <Search size={18} strokeWidth={1.5} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" aria-hidden />
            <input
              id="busca"
              type="search"
              className="input pl-10"
              placeholder="Buscar"
              value={query}
              onChange={(e) => update("q", e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="w-36 shrink-0 sm:w-56">
            <label htmlFor="ordem" className="sr-only">Ordenar por</label>
            <select id="ordem" className="input" value={sort} onChange={(e) => update("ordem", e.target.value === "destaque" ? null : e.target.value)}>
              {sortOptions.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div role="group" aria-label="Filtrar por família olfativa" className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          <button type="button" className={chip(!family)} aria-pressed={!family} onClick={() => update("familia", null)}>
            Todas
          </button>
          {families.map((f) => (
            <button key={f.id} type="button" className={chip(family === f.id)} aria-pressed={family === f.id} onClick={() => update("familia", f.id)}>
              {f.name}
            </button>
          ))}
        </div>

        <div className="flex min-h-9 items-center justify-between text-sm text-muted">
          <p role="status">
            {result.length} {result.length === 1 ? "fragrância" : "fragrâncias"}
          </p>
          {hasFilters && (
            <button type="button" className="inline-flex items-center gap-1 text-ink underline-offset-4 hover:underline" onClick={() => setParams({}, { replace: true })}>
              <X size={14} /> Limpar filtros
            </button>
          )}
        </div>
      </div>

      {result.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3">
          {result.map((p, i) => (
            <ProductCard key={p.id} product={p} eager={i < 4} />
          ))}
        </div>
      ) : (
        <div className="rounded-soft bg-cream px-6 py-16 text-center">
          <h2 className="text-3xl">Nenhuma fragrância encontrada</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted">Tente outro nome ou outra família olfativa.</p>
          <button type="button" className="btn-secondary mt-6" onClick={() => setParams({}, { replace: true })}>
            Limpar filtros
          </button>
        </div>
      )}

      {/* Atalho fixo para a sacola no celular */}
      {totalUnits > 0 && (
        <div className="sticky bottom-4 z-30 mt-10 md:hidden">
          <Link to="/carrinho" className="btn-primary w-full justify-between shadow-lg">
            <span className="inline-flex items-center gap-2">
              <ShoppingBag size={18} strokeWidth={1.5} /> Ver sacola ({totalUnits})
            </span>
            <span>{formatBRL(totalCents)}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
