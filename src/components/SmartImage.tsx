import { useState, type ImgHTMLAttributes } from "react";
import { siteConfig } from "../config/siteConfig";

/** <img> com carregamento preguiçoso e painel de fallback caso a URL falhe. */
export function SmartImage({ className = "", alt, loading = "lazy", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`flex items-center justify-center bg-sand ${className}`}>
        <span className="font-serif text-lg tracking-[0.3em] text-earth/60">{siteConfig.brandName}</span>
      </div>
    );
  }
  return (
    <img
      {...props}
      alt={alt}
      loading={loading}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`bg-sand object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
}
