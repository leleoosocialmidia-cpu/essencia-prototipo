import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/usePageMeta";

export function NotFound() {
  usePageMeta("Página não encontrada");
  return (
    <div className="container-site flex flex-col items-center py-28 text-center">
      <p className="font-serif text-7xl text-sand-dark">404</p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Esta página se dissipou no ar</h1>
      <p className="mt-4 max-w-sm text-muted">O endereço pode ter mudado ou não existir mais.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/produtos" className="btn-primary">Ver fragrâncias</Link>
        <Link to="/" className="btn-secondary">Página inicial</Link>
      </div>
    </div>
  );
}
