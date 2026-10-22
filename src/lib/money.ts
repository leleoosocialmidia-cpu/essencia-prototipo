// Valores monetários trafegam SEMPRE em centavos inteiros; só viram texto na exibição.
const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatBRL(cents: number): string {
  // Intl usa espaço não separável (U+00A0) após "R$"; mantemos assim.
  return brl.format(cents / 100);
}
