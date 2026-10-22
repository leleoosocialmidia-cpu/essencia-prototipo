import { Check, X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

/** Confirmação visual ao adicionar à sacola (anunciada a leitores de tela). */
export function Toast() {
  const { notice, dismissNotice } = useCart();

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(dismissNotice, 4000);
    return () => clearTimeout(t);
  }, [notice, dismissNotice]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:justify-end sm:px-8">
      {notice && (
        <div key={notice.id} className="animate-fade-up pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-soft bg-ink px-4 py-3 text-sm text-ivory shadow-lg">
          <Check size={18} strokeWidth={1.5} className="shrink-0 text-sage" aria-hidden />
          <p className="flex-1">{notice.message}</p>
          <Link to="/carrinho" onClick={dismissNotice} className="shrink-0 underline underline-offset-4">
            Ver sacola
          </Link>
          <button type="button" onClick={dismissNotice} className="-mr-2 flex h-9 w-9 shrink-0 items-center justify-center" aria-label="Fechar aviso">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
