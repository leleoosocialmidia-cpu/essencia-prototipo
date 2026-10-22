import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/", label: "Início" },
  { to: "/produtos", label: "Produtos" },
  { to: "/sobre", label: "Sobre" },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `py-2 text-sm tracking-wide transition-colors hover:text-olive ${isActive ? "text-olive underline decoration-1 underline-offset-8" : "text-ink"}`;

export function Header() {
  const { totalUnits } = useCart();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-sand-dark/60 bg-ivory/90 backdrop-blur">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-soft focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory">
        Pular para o conteúdo
      </a>
      <div className="container-site flex h-16 items-center justify-between">
        <button
          type="button"
          className="-ml-2 flex h-11 w-11 items-center justify-center md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>

        {/* Logotipo textual PROVISÓRIO — trocar por <img> do logo oficial */}
        <Link to="/" className="font-serif text-2xl tracking-[0.25em] text-ink md:text-[1.7rem]" aria-label={`${siteConfig.brandName} — página inicial`}>
          {siteConfig.brandName}
        </Link>

        <nav aria-label="Principal" className="hidden gap-9 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end className={navClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/carrinho" className="relative -mr-2 flex h-11 w-11 items-center justify-center hover:text-olive" aria-label={`Sacola de compras, ${totalUnits} ${totalUnits === 1 ? "item" : "itens"}`}>
          <ShoppingBag size={22} strokeWidth={1.5} />
          {totalUnits > 0 && (
            <span key={totalUnits} className="animate-fade-up absolute top-1 right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-olive px-1 text-[11px] font-medium text-ivory">
              {totalUnits}
            </span>
          )}
        </Link>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Menu móvel" className="border-t border-sand-dark/60 bg-ivory md:hidden">
          <ul className="container-site flex flex-col py-3">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end className={({ isActive }) => `block py-3 font-serif text-2xl ${isActive ? "text-olive" : "text-ink"}`}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
