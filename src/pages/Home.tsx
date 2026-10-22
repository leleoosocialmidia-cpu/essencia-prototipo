import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { SmartImage } from "../components/SmartImage";
import { homeCopy as c } from "../content/copy";
import { images } from "../data/images";
import { families, products } from "../data/products";
import { usePageMeta } from "../lib/usePageMeta";

export function Home() {
  usePageMeta();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="container-site grid items-center gap-8 pt-6 pb-16 md:pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-12 lg:pb-24">
          <div className="animate-fade-up order-2 lg:order-1 lg:col-span-6 xl:col-span-5">
            <p className="eyebrow mb-5">{c.hero.eyebrow}</p>
            <h1 className="text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">{c.hero.title}</h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">{c.hero.subtitle}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/produtos" className="btn-primary">
                {c.hero.primaryCta} <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <Link to="/sobre" className="btn-secondary">
                {c.hero.secondaryCta}
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-7">
            <SmartImage
              src={images[c.hero.image]}
              alt={c.hero.imageAlt}
              loading="eager"
              fetchPriority="high"
              className="aspect-[4/3] w-full rounded-soft sm:aspect-[16/10] lg:aspect-[5/6]"
            />
          </div>
        </div>
      </section>

      {/* Coleção em destaque */}
      <section className="container-site py-16" aria-labelledby="destaques">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">{c.featured.eyebrow}</p>
            <h2 id="destaques" className="text-4xl sm:text-5xl">{c.featured.title}</h2>
          </div>
          <Link to="/produtos" className="hidden shrink-0 items-center gap-2 text-sm hover:text-olive sm:inline-flex">
            Ver todas <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <Link to="/produtos" className="btn-secondary mt-10 w-full sm:hidden">
          Ver todas as fragrâncias
        </Link>
      </section>

      {/* Seção sensorial (editorial) */}
      <section className="bg-cream py-20 md:py-28" aria-labelledby="sensorial">
        <div className="container-site">
          <div className="mb-14 max-w-xl">
            <p className="eyebrow mb-3">{c.sensorial.eyebrow}</p>
            <h2 id="sensorial" className="text-4xl leading-tight sm:text-5xl">{c.sensorial.title}</h2>
          </div>
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {c.sensorial.blocks.map((b, i) => (
              <figure key={b.title} className={i === 1 ? "md:mt-16" : ""}>
                <SmartImage src={images[b.image]} alt={b.alt} className="aspect-[3/4] w-full rounded-soft" />
                <figcaption className="pt-5">
                  <h3 className="text-2xl">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Descoberta por família olfativa */}
      <section className="container-site py-20" aria-labelledby="familias">
        <p className="eyebrow mb-3">{c.discovery.eyebrow}</p>
        <h2 id="familias" className="mb-10 text-4xl sm:text-5xl">{c.discovery.title}</h2>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {families.map((f) => (
            <li key={f.id}>
              <Link to={`/produtos?familia=${f.id}`} className="group relative block overflow-hidden rounded-soft">
                <SmartImage src={images[f.image]} alt="" className="aspect-[3/4] w-full transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-ivory sm:p-5">
                  <h3 className="text-2xl sm:text-3xl">{f.name}</h3>
                  <p className="mt-1 hidden text-sm text-ivory/85 sm:block">{f.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
