import { Link } from "react-router-dom";
import { SmartImage } from "../components/SmartImage";
import { aboutCopy as c } from "../content/copy";
import { images } from "../data/images";
import { usePageMeta } from "../lib/usePageMeta";

export function About() {
  usePageMeta("Sobre", c.intro);

  return (
    <>
      <section className="relative">
        <SmartImage src={images[c.hero.image]} alt={c.hero.alt} loading="eager" className="h-[48svh] min-h-72 w-full md:h-[62svh]" />
      </section>

      <section className="container-site -mt-16 md:-mt-24">
        <div className="relative max-w-3xl rounded-soft bg-ivory px-6 pt-10 pb-4 sm:px-10">
          <p className="eyebrow mb-4">{c.eyebrow}</p>
          <h1 className="text-5xl leading-[1.05] sm:text-6xl">{c.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{c.intro}</p>
        </div>
      </section>

      <section className="container-site mt-16 space-y-20 md:mt-24 md:space-y-28">
        {c.sections.map((s, i) => (
          <div key={s.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <SmartImage src={images[s.image]} alt={s.alt} className={`aspect-[4/5] w-full rounded-soft ${i % 2 ? "md:order-2" : ""}`} />
            <div className="max-w-md">
              <span className="font-serif text-xl text-earth italic">0{i + 1}</span>
              <h2 className="mt-2 text-4xl">{s.title}</h2>
              <p className="mt-4 leading-relaxed text-muted">{s.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="container-site mt-24 text-center">
        <p className="mx-auto max-w-lg text-xs text-muted">{c.note}</p>
        <Link to="/produtos" className="btn-primary mt-8">Descobrir fragrâncias</Link>
      </section>
    </>
  );
}
