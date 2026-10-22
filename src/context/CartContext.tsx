import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { products, type Product } from "../data/products";
import { cartReducer, parseStoredCart, summarize, type CartSummaryLine } from "../lib/cart";

const STORAGE_KEY = "essencia:cart:v1";

interface Notice {
  id: number;
  message: string;
}

interface CartContextValue {
  items: CartSummaryLine[];
  totalCents: number;
  totalUnits: number;
  quantityOf: (productId: string) => number;
  add: (product: Product, quantity?: number) => void;
  setQuantity: (product: Product, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  notice: Notice | null;
  dismissNotice: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadCart() {
  try {
    return parseStoredCart(localStorage.getItem(STORAGE_KEY));
  } catch {
    return []; // localStorage indisponível (modo privado restrito)
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, undefined, loadCart);
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* sem persistência, o carrinho continua funcionando na sessão */
    }
  }, [lines]);

  // Sincroniza entre abas abertas.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      dispatch({ type: "clear" });
      for (const line of parseStoredCart(e.newValue)) {
        const product = products.find((p) => p.id === line.productId);
        if (product) dispatch({ type: "add", product, quantity: line.quantity });
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const summary = useMemo(() => summarize(lines, products), [lines]);

  const add = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: "add", product, quantity });
    setNotice({ id: Date.now(), message: `${product.name} foi adicionado à sacola.` });
  }, []);

  const dismissNotice = useCallback(() => setNotice(null), []);

  const value: CartContextValue = {
    ...summary,
    quantityOf: (id) => summary.items.find((i) => i.productId === id)?.quantity ?? 0,
    add,
    setQuantity: (product, quantity) => dispatch({ type: "set", product, quantity }),
    remove: (productId) => dispatch({ type: "remove", productId }),
    clear: () => dispatch({ type: "clear" }),
    notice,
    dismissNotice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
