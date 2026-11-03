"use client";
import { usePathname } from "next/navigation";
import { Brand } from "./Brand";
import { whatsappUrl } from "../lib/site";
import { ExperienceControls } from "./ExperienceControls";
import { slugId } from "../lib/ids";

export function SiteHeader() {
  const path = usePathname() || "/";
  const en = path.startsWith("/en");
  const root = en ? "/en" : "/";
  const navLinks = en
    ? [
        ["Solutions", `${root}#solucoes`],
        ["Plans", `${root}#planos`],
        ["How it works", `${root}#como`],
        ["Blog", "/en/blog"],
        ["Questions", `${root}#faq`],
      ]
    : [
        ["Soluções", "/#solucoes"],
        ["Planos", "/#planos"],
        ["Como funciona", "/#como"],
        ["Blog", "/blog"],
        ["Dúvidas", "/#faq"],
      ];
  return (
    <header className="siteHeader">
      <nav
        className="nav shell"
        aria-label={en ? "Main navigation" : "Navegação principal"}
      >
        <Brand id="link-header-brand" />
        <div className="navlinks">
          {navLinks.map(([label, href]) => (
            <a id={`link-header-nav-${slugId(label)}`} key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <div className="navActions">
          <a id="btn-header-schedule" className="textButton" href={en ? "/en/schedule" : "/agendar"}>
            {en ? "Schedule" : "Agendar"}
          </a>
          <a id="btn-header-whatsapp"
            className="button"
            href={whatsappUrl(
              en
                ? "Hello, I visited the English website and would like to talk to Benê RH."
                : undefined,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            {en ? "Talk to Benê" : "Falar com a Benê"}
          </a>
        </div>
        <ExperienceControls />
        <details className="mobileMenu">
          <summary id="btn-header-menu-toggle" aria-label={en ? "Open menu" : "Abrir menu"}>
            {en ? "Menu" : "Menu"}
          </summary>
          <div>
            {navLinks.map(([label, href]) => (
              <a id={`link-header-mobile-nav-${slugId(label)}`} key={href} href={href}>
                {label}
              </a>
            ))}
            <a id="link-header-mobile-schedule" href={en ? "/en/schedule" : "/agendar"}>
              {en ? "Schedule a call" : "Agendar conversa"}
            </a>
            <a id="link-header-mobile-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </details>
      </nav>
    </header>
  );
}
