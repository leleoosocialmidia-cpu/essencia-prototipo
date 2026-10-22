import type { FamilyId, Product } from "../data/products";

export type SortId = "destaque" | "preco-asc" | "preco-desc" | "nome";

export const sortOptions: { id: SortId; label: string }[] = [
  { id: "destaque", label: "Destaques" },
  { id: "preco-asc", label: "Menor preço" },
  { id: "preco-desc", label: "Maior preço" },
  { id: "nome", label: "Nome (A–Z)" },
];

const normalize = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

export function filterProducts(list: Product[], opts: { query: string; family: FamilyId | null; sort: SortId }) {
  const q = normalize(opts.query);
  const result = list.filter((p) => (!opts.family || p.family === opts.family) && (!q || normalize(p.name).includes(q)));
  const byAvailability = (a: Product, b: Product) => Number(b.stock > 0) - Number(a.stock > 0);
  switch (opts.sort) {
    case "preco-asc":
      return result.sort((a, b) => a.priceCents - b.priceCents);
    case "preco-desc":
      return result.sort((a, b) => b.priceCents - a.priceCents);
    case "nome":
      return result.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    default:
      return result.sort((a, b) => byAvailability(a, b) || Number(!!b.featured) - Number(!!a.featured));
  }
}
