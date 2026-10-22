import { siteConfig } from "../config/siteConfig";
import { usePageMeta } from "../lib/usePageMeta";

// PROVISÓRIO: substitua pelos textos revisados juridicamente antes de operar a loja.
const sections = [
  { id: "envio", title: "Envio", text: "Prazos, valores, transportadoras e regiões atendidas serão definidos pela marca. As opções exibidas no checkout deste protótipo são fictícias." },
  { id: "trocas", title: "Trocas e devoluções", text: "A política de trocas e devoluções será publicada aqui, em conformidade com o Código de Defesa do Consumidor (incluindo o direito de arrependimento em compras on-line)." },
  { id: "privacidade", title: "Privacidade", text: "A política de privacidade descreverá como os dados pessoais são coletados, usados e protegidos, conforme a LGPD. Este protótipo não envia dados a nenhum servidor: o carrinho fica salvo apenas no seu navegador." },
];

export function Policies() {
  usePageMeta("Políticas");
  return (
    <div className="container-site max-w-3xl pt-12">
      <p className="eyebrow mb-3">Informações provisórias</p>
      <h1 className="text-5xl">Políticas da loja</h1>
      <div className="mt-12 space-y-12">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-3xl">{s.title}</h2>
            <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
          </section>
        ))}
      </div>
      <p className="mt-12 text-sm text-muted">Dúvidas: <a className="text-ink underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> (contato demonstrativo).</p>
    </div>
  );
}
