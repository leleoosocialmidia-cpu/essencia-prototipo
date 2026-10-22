import type { CustomerData } from "../services/checkout";

export const UFS = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" ");

const digits = (v: string) => v.replace(/\D/g, "");

export type Errors = Partial<Record<keyof CustomerData, string>>;

export function validateContact(d: CustomerData): Errors {
  const e: Errors = {};
  if (d.name.trim().split(/\s+/).length < 2) e.name = "Informe nome e sobrenome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Informe um e-mail válido.";
  const phone = digits(d.phone);
  if (phone.length < 10 || phone.length > 11) e.phone = "Informe o telefone com DDD.";
  return e;
}

export function validateAddress(d: CustomerData): Errors {
  const e: Errors = {};
  if (digits(d.cep).length !== 8) e.cep = "O CEP deve ter 8 dígitos.";
  if (!d.street.trim()) e.street = "Informe o endereço.";
  if (!d.number.trim()) e.number = "Informe o número (ou S/N).";
  if (!d.district.trim()) e.district = "Informe o bairro.";
  if (!d.city.trim()) e.city = "Informe a cidade.";
  if (!UFS.includes(d.state)) e.state = "Selecione o estado.";
  return e;
}

export const maskCep = (v: string) => digits(v).slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");

export function maskPhone(v: string) {
  const d = digits(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
