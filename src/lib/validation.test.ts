import { expect, it } from "vitest";
import { maskCep, maskPhone, validateAddress, validateContact } from "./validation";

const empty = { name: "", email: "", phone: "", cep: "", street: "", number: "", complement: "", district: "", city: "", state: "" };

it("exige campos obrigatórios", () => {
  expect(Object.keys(validateContact(empty))).toEqual(["name", "email", "phone"]);
  expect(Object.keys(validateAddress(empty))).toEqual(["cep", "street", "number", "district", "city", "state"]);
});

it("aceita dados válidos sem complemento", () => {
  const ok = { ...empty, name: "Ana Souza", email: "ana@example.com", phone: "(11) 91234-5678", cep: "01001-000", street: "Rua A", number: "10", district: "Centro", city: "São Paulo", state: "SP" };
  expect(validateContact(ok)).toEqual({});
  expect(validateAddress(ok)).toEqual({});
});

it("aplica máscaras", () => {
  expect(maskCep("01001000")).toBe("01001-000");
  expect(maskPhone("11912345678")).toBe("(11) 91234-5678");
  expect(maskPhone("1132345678")).toBe("(11) 3234-5678");
});
