// Lógica pura do carrinho (sem React), testada em cart.test.ts.
import { siteConfig } from "../config/siteConfig";
import type { Product } from "../data/products";

export interface CartLine {
  productId: string;
  quantity: number;
}

export type CartAction =
  | { type: "add"; product: Product; quantity: number }
  | { type: "set"; product: Product; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "clear" };

export const maxQuantity = (product: Product) => Math.min(product.stock, siteConfig.maxPerItem);

export function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "add": {
      const current = lines.find((l) => l.productId === action.product.id)?.quantity ?? 0;
      return cartReducer(lines, { type: "set", product: action.product, quantity: current + action.quantity });
    }
    case "set": {
      const qty = Math.max(0, Math.min(Math.floor(action.quantity), maxQuantity(action.product)));
      const others = lines.filter((l) => l.productId !== action.product.id);
      if (qty === 0) return others;
      const exists = lines.some((l) => l.productId === action.product.id);
      return exists
        ? lines.map((l) => (l.productId === action.product.id ? { ...l, quantity: qty } : l))
        : [...lines, { productId: action.product.id, quantity: qty }];
    }
    case "remove":
      return lines.filter((l) => l.productId !== action.productId);
    case "clear":
      return [];
  }
}

export interface CartSummaryLine extends CartLine {
  product: Product;
  subtotalCents: number;
}

/** Junta linhas com o catálogo atual, descartando produtos removidos e reajustando ao estoque. */
export function summarize(lines: CartLine[], catalog: Product[]) {
  const items: CartSummaryLine[] = [];
  for (const line of lines) {
    const product = catalog.find((p) => p.id === line.productId);
    if (!product) continue;
    const quantity = Math.min(line.quantity, maxQuantity(product));
    if (quantity <= 0) continue;
    items.push({ ...line, quantity, product, subtotalCents: product.priceCents * quantity });
  }
  return {
    items,
    totalCents: items.reduce((s, i) => s + i.subtotalCents, 0),
    totalUnits: items.reduce((s, i) => s + i.quantity, 0),
  };
}

/** Lê o carrinho salvo, ignorando dados corrompidos. */
export function parseStoredCart(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(
      (l): l is CartLine =>
        typeof l?.productId === "string" && Number.isInteger(l?.quantity) && l.quantity > 0,
    );
  } catch {
    return [];
  }
}
