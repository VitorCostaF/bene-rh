"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NewsletterForm } from "./NewsletterForm";

type Intent = "hire" | "organize" | "ongoing" | "content" | "start";
const replies = {
  pt: {
    welcome:
      "Oi! Eu sou a Benê, assistente virtual do site. Posso ajudar você a encontrar o próximo passo ou entender melhor o momento da sua empresa. O que vamos fazer hoje?",
    hire: "Vamos cuidar dessa contratação com você. A Benê ajuda a definir o perfil, organizar a triagem, conduzir as primeiras entrevistas e apresentar uma shortlist para deixar a decisão mais segura.",
    organize:
      "Vamos colocar a casa em ordem, um passo de cada vez. Se os processos estão espalhados ou o RH acaba ficando no colo do dono, o Diagnóstico + Estruturação ajuda a enxergar prioridades e começar pelo que mais importa.",
    ongoing:
      "Que bom ter apoio contínuo por perto. Os planos Start, Pro e Full acompanham diferentes momentos da empresa — eu posso mostrar qual deles combina melhor com a sua realidade.",
    content:
      "Claro! Deixe seu e-mail abaixo para receber conteúdos práticos que ajudam a tornar a rotina de pessoas mais leve. O cadastro só acontece com a sua autorização.",
    start:
      "Sem problema — você não precisa saber o nome da solução. Vamos entender o momento da empresa e encontrar juntos uma boa primeira rota. O Diagnóstico Benê leva poucos minutos.",
  },
  en: {
    welcome:
      "Hi! I am Benê, the website’s virtual assistant. I can help you find the next step or better understand your company’s current stage. What shall we work on today?",
    hire: "Let’s take care of this hire together. Benê helps define the profile, organize screening, conduct the first interviews and present a shortlist so the decision feels safer.",
    organize:
      "Let’s put things in order, one step at a time. If processes are scattered or HR sits entirely with the owner, Diagnosis + Structuring helps reveal priorities and start with what matters most.",
    ongoing:
      "It is good to have ongoing support nearby. Start, Pro and Full serve different stages of the business — I can show you which one best fits your reality.",
    content:
      "Of course! Leave your email below to receive practical content that makes people management feel lighter. We only save your details with your permission.",
    start:
      "No problem — you do not need to know the name of the solution. Let’s understand the company’s current stage and find a good first route together. The Benê Diagnosis only takes a few minutes.",
  },
};

export function BeneAssistant() {
  const [open, setOpen] = useState(false),
    [intent, setIntent] = useState<Intent>("start");
  const launcherRef = useRef<HTMLButtonElement>(null),
    closeRef = useRef<HTMLButtonElement>(null);
  const path = usePathname() || "/";
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      wasOpen.current = true;
    } else if (wasOpen.current) {
      launcherRef.current?.focus();
      wasOpen.current = false;
    }
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  if (path === "/agendar" || path === "/en/schedule") return null;
  const en = path.startsWith("/en"),
    copy = en ? replies.en : replies.pt;
  const home = en ? "/en" : "/";
  const message = open
    ? intent === "start"
      ? copy.welcome
      : copy[intent]
    : copy.welcome;
  const link =
    intent === "hire"
      ? `${home}#recrutamento`
      : intent === "organize"
        ? `${home}#estruturacao`
        : intent === "ongoing"
          ? `${home}#planos`
          : `${home}#diagnostico`;
  const labels = en
    ? {
        title: "Talk to Benê",
        subtitle: "Virtual website assistant",
        close: "Close assistant",
        open: "Open the Benê assistant",
        hire: "I have a role to fill",
        organize: "I want to put HR in order",
        ongoing: "I want ongoing support",
        content: "Send me practical tips",
        start: "Help me find where to start",
        see: "Show me this route",
      }
    : {
        title: "Fale com a Benê",
        subtitle: "Assistente virtual do site",
        close: "Fechar assistente",
        open: "Abrir a assistente Benê",
        hire: "Tenho uma vaga para preencher",
        organize: "Quero colocar meu RH em ordem",
        ongoing: "Quero apoio contínuo",
        content: "Quero receber dicas práticas",
        start: "Quero entender por onde começar",
        see: "Quero conhecer essa rota",
      };
  return (
    <aside
      className={`beneAssistant ${open ? "open" : ""}`}
      aria-label={labels.title}
    >
      {open && (
        <div
          id="bene-assistant-panel"
          className="assistantPanel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="bene-assistant-title"
        >
          <header>
            <div>
              <b id="bene-assistant-title">{labels.title}</b>
              <span>{labels.subtitle}</span>
            </div>
            <button
              ref={closeRef}
              onClick={() => setOpen(false)}
              aria-label={labels.close}
            >
              ×
            </button>
          </header>
          <div className="assistantBody">
            <div className="assistantAvatar">
              <img
                src="/bene-assistente.png"
                alt={
                  en
                    ? "Benê, the virtual assistant character"
                    : "Benê, personagem da assistente virtual"
                }
              />
            </div>
            <p aria-live="polite">{message}</p>
            {intent === "content" ? (
              <NewsletterForm
                locale={en ? "en" : "pt"}
                compact
                source={en ? "assistant-en" : "assistant-pt"}
              />
            ) : (
              intent !== "start" && (
                <a className="buttonSecondary assistantRoute" href={link}>
                  {labels.see} →
                </a>
              )
            )}
            <div className="assistantChoices">
              <button onClick={() => setIntent("hire")}>{labels.hire}</button>
              <button onClick={() => setIntent("organize")}>
                {labels.organize}
              </button>
              <button onClick={() => setIntent("ongoing")}>
                {labels.ongoing}
              </button>
              <button onClick={() => setIntent("content")}>
                {labels.content}
              </button>
              <button onClick={() => setIntent("start")}>{labels.start}</button>
            </div>
            <small>
              {en
                ? "Do not share names, reports, health information or documents here."
                : "Não compartilhe nomes, denúncias, informações de saúde ou documentos por aqui."}
            </small>
          </div>
        </div>
      )}
      <button
        ref={launcherRef}
        className="assistantLauncher"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? labels.close : labels.open}
      >
        <img src="/bene-assistente.png" alt="" />
        <span>{en ? "Can I help?" : "Posso ajudar?"}</span>
      </button>
    </aside>
  );
}
