"use client";
import { usePathname } from "next/navigation";
export function SkipLink() {
  const en = (usePathname() || "/").startsWith("/en");
  return (
    <a id="link-skip-to-content" className="skipLink" href="#conteudo">
      {en ? "Skip to content" : "Pular para o conteúdo"}
    </a>
  );
}
