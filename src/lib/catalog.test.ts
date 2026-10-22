import { expect, it } from "vitest";
import { products } from "../data/products";
import { filterProducts } from "./catalog";

const names = (r: { name: string }[]) => r.map((p) => p.name);

it("pesquisa sem acento e sem diferenciar maiúsculas", () => {
  expect(names(filterProducts(products, { query: "BOTANICA", family: null, sort: "nome" }))).toEqual(["Brisa Botânica"]);
});

it("filtra por família", () => {
  const r = filterProducts(products, { query: "", family: "amadeirada", sort: "nome" });
  expect(r.every((p) => p.family === "amadeirada")).toBe(true);
  expect(r).toHaveLength(2);
});

it("ordena por preço e nome", () => {
  const asc = filterProducts(products, { query: "", family: null, sort: "preco-asc" }).map((p) => p.priceCents);
  expect(asc).toEqual([...asc].sort((a, b) => a - b));
  const desc = filterProducts(products, { query: "", family: null, sort: "preco-desc" }).map((p) => p.priceCents);
  expect(desc).toEqual([...asc].reverse());
  expect(names(filterProducts(products, { query: "", family: null, sort: "nome" }))[0]).toBe("Âmbar do Entardecer");
});

it("retorna vazio quando nada corresponde", () => {
  expect(filterProducts(products, { query: "xyz", family: null, sort: "destaque" })).toEqual([]);
});
