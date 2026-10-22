/**
 * PONTOS DE EXTENSÃO DO CHECKOUT — tudo aqui é DEMONSTRATIVO.
 *
 * Para operar como loja real:
 *  - `getShippingOptions` deve consultar uma API de frete (ex.: Correios,
 *    Melhor Envio, transportadora) a partir do CEP, idealmente via backend.
 *  - `submitOrder` deve chamar o SEU backend, que cria o pedido e inicia o
 *    pagamento em um provedor confiável (Pix, cartão, boleto). Dados de cartão
 *    nunca devem passar por este frontend: use o checkout/SDK do provedor.
 *  - Chaves secretas de provedores ficam só no servidor, nunca aqui.
 */
import { siteConfig } from "../config/siteConfig";
import type { CartSummaryLine } from "../lib/cart";

export interface ShippingOption {
  id: string;
  label: string;
  eta: string;
  priceCents: number;
}

export function getShippingOptions(subtotalCents: number): ShippingOption[] {
  const free = subtotalCents >= siteConfig.freeShippingThresholdCents;
  return [
    { id: "padrao", label: "Entrega padrão", eta: "5 a 8 dias úteis (estimativa fictícia)", priceCents: free ? 0 : 1990 },
    { id: "expressa", label: "Entrega expressa", eta: "2 a 3 dias úteis (estimativa fictícia)", priceCents: 3490 },
    { id: "retirada", label: "Retirada", eta: "Local a definir", priceCents: 0 },
  ];
}

export const paymentMethods = [
  { id: "pix", label: "Pix", hint: "O QR Code seria gerado pelo provedor de pagamento." },
  { id: "cartao", label: "Cartão de crédito", hint: "Os dados do cartão seriam coletados no ambiente seguro do provedor — nunca neste site." },
  { id: "boleto", label: "Boleto bancário", hint: "O boleto seria emitido pelo provedor de pagamento." },
] as const;

export type PaymentMethodId = (typeof paymentMethods)[number]["id"];

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
}

export interface OrderRequest {
  customer: CustomerData;
  items: CartSummaryLine[];
  shipping: ShippingOption;
  payment: PaymentMethodId;
  totalCents: number;
}

/** DEMONSTRATIVO: não envia dados a lugar nenhum, só devolve um código fictício. */
export async function submitOrder(order: OrderRequest): Promise<{ demoCode: string; totalCents: number }> {
  await new Promise((r) => setTimeout(r, 700));
  return { demoCode: `DEMO-${Date.now().toString(36).toUpperCase()}`, totalCents: order.totalCents };
}
