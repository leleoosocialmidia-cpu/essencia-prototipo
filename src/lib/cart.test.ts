import { describe, expect, it } from "vitest";
import { cartReducer, parseStoredCart, summarize } from "./cart";
import { formatBRL } from "./money";
import { products } from "../data/products";

const brisa = products.find((p) => p.slug === "brisa-botanica")!; // R$ 189,90, estoque 12
const ambar = products.find((p) => p.slug === "ambar-do-entardecer")!; // estoque 3
const esgotado = products.find((p) => p.stock === 0)!;

describe("carrinho", () => {
  it("adiciona, soma e calcula total em centavos", () => {
    let c = cartReducer([], { type: "add", product: brisa, quantity: 2 });
    c = cartReducer(c, { type: "add", product: brisa, quantity: 1 });
    c = cartReducer(c, { type: "add", product: ambar, quantity: 1 });
    const s = summarize(c, products);
    expect(s.totalUnits).toBe(4);
    expect(s.items[0].subtotalCents).toBe(56970);
    expect(s.totalCents).toBe(56970 + 26990);
  });

  it("não ultrapassa o estoque e ignora esgotados", () => {
    let c = cartReducer([], { type: "add", product: ambar, quantity: 10 });
    expect(c[0].quantity).toBe(3);
    c = cartReducer(c, { type: "add", product: esgotado, quantity: 1 });
    expect(c).toHaveLength(1);
  });

  it("diminui até remover e remove direto", () => {
    let c = cartReducer([], { type: "add", product: brisa, quantity: 1 });
    c = cartReducer(c, { type: "set", product: brisa, quantity: 0 });
    expect(c).toEqual([]);
    c = cartReducer([], { type: "add", product: brisa, quantity: 2 });
    expect(cartReducer(c, { type: "remove", productId: brisa.id })).toEqual([]);
  });

  it("tolera localStorage corrompido", () => {
    expect(parseStoredCart("{oops")).toEqual([]);
    expect(parseStoredCart('[{"productId":"p01","quantity":2},{"x":1}]')).toEqual([
      { productId: "p01", quantity: 2 },
    ]);
  });

  it("formata em reais", () => {
    expect(formatBRL(18990)).toBe("R$ 189,90");
    expect(formatBRL(123456)).toBe("R$ 1.234,56");
  });
});
