import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-sand-dark/60 bg-cream">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-2xl tracking-[0.25em]">{siteConfig.brandName}</p>
          <p className="mt-3 max-w-60 text-sm leading-relaxed text-muted">{siteConfig.tagline}.</p>
        </div>

        <nav aria-label="Rodapé — loja">
          <h2 className="eyebrow mb-4 font-sans">Loja</h2>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-olive" to="/">Início</Link></li>
            <li><Link className="hover:text-olive" to="/produtos">Produtos</Link></li>
            <li><Link className="hover:text-olive" to="/sobre">Sobre</Link></li>
            <li><Link className="hover:text-olive" to="/carrinho">Sacola</Link></li>
          </ul>
        </nav>

        <nav aria-label="Rodapé — ajuda">
          <h2 className="eyebrow mb-4 font-sans">Ajuda</h2>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-olive" to="/politicas#envio">Envio</Link></li>
            <li><Link className="hover:text-olive" to="/politicas#trocas">Trocas e devoluções</Link></li>
            <li><Link className="hover:text-olive" to="/politicas#privacidade">Privacidade</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-4 font-sans">Contato</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:text-olive" href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram {siteConfig.instagramHandle}
              </a>
            </li>
            <li>
              <a className="hover:text-olive" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            </li>
          </ul>
          <p className="mt-2 text-xs text-muted">(links demonstrativos)</p>
        </div>
      </div>

      <div className="border-t border-sand-dark/60">
        <div className="container-site flex flex-col gap-1 py-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            {siteConfig.legal.companyName} · CNPJ {siteConfig.legal.cnpj} · {siteConfig.legal.address}
          </p>
          <p>Protótipo de demonstração — informações provisórias.</p>
        </div>
      </div>
    </footer>
  );
}
