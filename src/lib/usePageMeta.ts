import { useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

/** Define título e descrição da página (SEO básico e compartilhamento). */
export function usePageMeta(title?: string, description: string = siteConfig.description) {
  useEffect(() => {
    document.title = title ? `${title} — ${siteConfig.brandName}` : `${siteConfig.brandName} — ${siteConfig.tagline}`;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) {
      document.querySelector(selector)?.setAttribute("content", description);
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
  }, [title, description]);
}
