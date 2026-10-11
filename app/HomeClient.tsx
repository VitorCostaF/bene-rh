"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { NewsletterSection } from "./components/NewsletterForm";
import { BrandMarquee } from "./components/BrandMarquee";
const plans = [
  [
    "Start",
    "R$ 1.500/mês",
    "Até 10 pessoas · 1 vaga padrão ativa",
    "R&S, onboarding e suporte mensal",
  ],
  [
    "Pro",
    "R$ 3.500/mês",
    "Até 30 pessoas · 2 vagas padrão ativas",
    "Start + gestão, treinamento e cultura",
  ],
  [
    "Full",
    "R$ 7.000/mês",
    "Até 60 pessoas · 3 vagas padrão ativas",
    "Pro + RH estratégico, educação corporativa e apoio de compliance",
  ],
];
function track(
  event: string,
  props: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;
  const row = { event, timestamp: new Date().toISOString(), ...props };
  const old = JSON.parse(localStorage.getItem("bene_events") || "[]");
  localStorage.setItem(
    "bene_events",
    JSON.stringify([...old, row].slice(-100)),
  );
}
export default function Home() {
  useEffect(() => {
    const u = new URLSearchParams(location.search);
    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ].forEach((k) => {
      const v = u.get(k);
      if (v) sessionStorage.setItem(k, v);
    });
    track("page_view", { source: u.get("utm_source") || "direct" });
  }, []);
  const cta = (label: string) => (
    <a
      className="button"
      href="/agendar"
      onClick={() => track("cta_click", { label })}
    >
      {label}
    </a>
  );
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <section className="hero" id="top">
          <div className="shell heroGrid">
            <div>
              <p className="eyebrow">RH SOB DEMANDA PARA PMES</p>
              <h1>
                Gestão de pessoas sob medida,{" "}
                <em>sem ampliar sua equipe interna.</em>
              </h1>
              <p className="lead">
                Contratação, organização e gestão de pessoas para sua empresa
                crescer com mais clareza - enquanto você cuida do negócio.
              </p>
              <div className="actions">
                {cta("Agendar uma conversa")}
                <a className="textLink" href="#recrutamento">
                  Preciso contratar →
                </a>
              </div>
              <p className="micro">
                Conversa de até 30 minutos com a Benê, se você quiser avançar
              </p>
            </div>
            <aside className="heroCard">
              <span>GENTE BOA CUIDANDO DE GENTE. ✦</span>
              <blockquote>
                Seu RH funcionando, você focado no negócio.
              </blockquote>
              <p>
                Uma rota objetiva para cada momento: contratar, estruturar ou
                ter apoio contínuo.
              </p>
            </aside>
          </div>
        </section>
        <section className="section shell" id="solucoes">
          <p className="eyebrow">COMECE PELA DOR</p>
          <div className="sectionTitle situationTitle">
            <h2>O que está pesando na sua rotina hoje?</h2>
            <p>
              Você não precisa saber o nome da solução. A Benê ajuda a encontrar
              o próximo passo.
            </p>
          </div>
          <div className="painGrid">
            {[
              ["Preciso contratar", "R&S sob demanda", "#recrutamento"],
              [
                "Meu RH virou bagunça",
                "Diagnóstico + Estruturação",
                "#estruturacao",
              ],
              ["Preciso de RH contínuo", "Planos mensais", "#planos"],
              [
                "Não sei por onde começar",
                "Conversa com a Benê",
                "/agendar",
              ],
            ].map((x, i) => (
              <a className="pain" href={x[2]} key={x[0]}>
                <span>0{i + 1}</span>
                <h3>{x[0]}</h3>
                <p>{x[1]}</p>
                <b>Ver caminho →</b>
              </a>
            ))}
          </div>
        </section>
        <section className="section warm" id="recrutamento">
          <div className="shell offerGrid">
            <div>
              <p className="eyebrow">ROTA 01 · NECESSIDADE PONTUAL</p>
              <h2>A pessoa certa para a vaga, sem parar sua operação.</h2>
              <p className="bodyText">
                Briefing, divulgação, triagem, entrevistas iniciais e shortlist
                de até três pessoas para vagas administrativas, comerciais ou
                operacionais.
              </p>
              <ul>
                <li>Shortlist em até 15 dias úteis após briefing aprovado</li>
                <li>50% na contratação e 50% na shortlist</li>
                <li>
                  Uma reposição sem nova taxa em até 30 dias após a admissão, se
                  cargo, remuneração e perfil forem mantidos
                </li>
              </ul>
            </div>
            <div className="priceCard">
              <p>R&S sob demanda</p>
              <strong>R$ 1.500</strong>
              <span>por vaga padrão</span>
              <small>
                Busca executiva, perfil técnico raro, volume, testes pagos,
                admissional e folha não inclusos.
              </small>
              {cta("Quero avaliar minha vaga")}
            </div>
          </div>
        </section>
        <section className="section shell" id="estruturacao">
          <div className="offerGrid reverse">
            <div className="priceCard dark">
              <p>Diagnóstico + Estruturação</p>
              <strong>R$ 2.500</strong>
              <span>projeto fechado</span>
              <small>
                Indicado para empresas com até 20 pessoas e uma única unidade.
                Entrega em até 10 dias úteis.
              </small>
              {cta("Quero organizar meu RH")}
            </div>
            <div>
              <p className="eyebrow">ROTA 02 · ORGANIZAÇÃO</p>
              <h2>Clareza para parar de apagar incêndios.</h2>
              <p className="bodyText">
                Mapa de gargalos, prioridades, até três processos, plano de 90
                dias e reunião de entrega, com uma rodada de ajustes.
              </p>
              <ul>
                <li>100% na contratação ou 2 parcelas no cartão</li>
                <li>
                  Sem implantação contínua, R&S, folha ou parecer jurídico
                </li>
                <li>Escopo validado antes da execução</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="section ink" id="planos">
          <div className="shell">
            <p className="eyebrow pale">ROTA 03 · APOIO CONTÍNUO</p>
            <div className="sectionTitle light">
              <h2>RH por assinatura, na medida do crescimento.</h2>
              <p>
                A Benê coordena uma rede de especialistas e parceiros para
                atender cada fase do seu RH com o conhecimento certo.
              </p>
            </div>
            <div className="plans">
              {plans.map((p, i) => (
                <article
                  className={i === 1 ? "plan featured" : "plan"}
                  key={p[0]}
                >
                  {i === 1 && <span className="tag">MAIS INDICADO</span>}
                  <h3>Benê {p[0]}</h3>
                  <strong>{p[1]}</strong>
                  <p>{p[2]}</p>
                  <hr />
                  <p>{p[3]}</p>
                  <a href={`/planos/${p[0].toLowerCase()}`}>
                    Ver se é para mim →
                  </a>
                </article>
              ))}
            </div>
            <p className="terms">
              Vigência mínima de três meses. Demandas fora do escopo são
              avaliadas e aprovadas antes da execução.
            </p>
          </div>
        </section>
        <section
          className="section shell comparison"
          aria-labelledby="plan-comparison-title"
        >
          <p className="eyebrow">COMPARE OS PLANOS</p>
          <h2 id="plan-comparison-title">
            Uma estrutura que cresce com a empresa.
          </h2>
          <p className="tableHint" id="plan-comparison-hint">
            Em telas pequenas, deslize horizontalmente para comparar todos os
            planos.
          </p>
          <div
            className="compareTable"
            role="region"
            aria-label="Comparação dos planos Benê RH"
            aria-describedby="plan-comparison-hint"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">O que está incluído</th>
                  <th scope="col">Start</th>
                  <th scope="col">Pro</th>
                  <th scope="col">Full</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Colaboradores", "10", "30", "60"],
                  ["Vagas simultâneas", "1", "2", "3"],
                  ["Rotina de RH", "✓", "✓", "✓"],
                  ["Onboarding", "✓", "✓", "✓"],
                  ["Suporte ao gestor", "✓", "✓", "✓"],
                  ["Gestão de pessoas", "-", "✓", "✓"],
                  ["Treinamento e cultura", "-", "✓", "✓"],
                  ["Indicadores avançados", "-", "-", "✓"],
                  ["RH estratégico", "-", "-", "✓"],
                  ["Performance estruturada", "-", "-", "✓"],
                  ["Educação corporativa", "-", "-", "✓"],
                  ["Dashboard executivo", "-", "-", "✓"],
                ].map((r) => (
                  <tr key={r[0]}>
                    <th scope="row">{r[0]}</th>
                    {r.slice(1).map((c, i) => (
                      <td key={i}>
                        {c === "✓" ? (
                          <>
                            <span aria-hidden="true">✓</span>
                            <span className="visuallyHidden">Incluído</span>
                          </>
                        ) : c === "-" ? (
                          <>
                            <span aria-hidden="true">—</span>
                            <span className="visuallyHidden">Não incluído</span>
                          </>
                        ) : (
                          c
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="section shell" id="como">
          <p className="eyebrow">SIMPLES DESDE O PRIMEIRO CONTATO</p>
          <div className="steps three">
            {[
              ["01", "Conversa", "Até 30 minutos para validar o contexto."],
              ["02", "Proposta", "Escopo, prazo e limites claros."],
              ["03", "Execução", "Status, evidências e próximos passos."],
            ].map((x) => (
              <div key={x[0]}>
                <b>{x[0]}</b>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="section shell">
          <div className="about">
            <figure className="portrait">
              <img
                src="/amanda-stamboni.webp"
                width="760"
                height="950"
                loading="lazy"
                decoding="async"
                alt="Amanda Stamboni, fundadora da Benê RH"
              />
              <figcaption>Amanda Stamboni</figcaption>
            </figure>
            <div>
              <p className="eyebrow">A LIDERANÇA POR TRÁS DA BENÊ</p>
              <h2>Uma rede de especialistas, coordenada de perto.</h2>
              <p className="bodyText">
                Amanda Stamboni está à frente da estratégia, do relacionamento
                com cada empresa e das decisões que exigem olhar humano.
                Conforme a necessidade, ela articula especialistas e parceiros
                de confiança para reunir o conhecimento certo em recrutamento,
                gestão de pessoas, desenvolvimento e áreas complementares.
              </p>
              <p className="credentials">
                Administradora com CRA ativo · Técnica em RH · Cientista de
                Dados · Fundadora da Consultoria Stamboni · Cofundadora da
                Zênite Escola de Negócios
              </p>
            </div>
          </div>
        </section>
        <section className="section blogPreview">
          <div className="shell">
            <p className="eyebrow">CONTEÚDO PARA QUEM LIDERA</p>
            <div className="sectionTitle">
              <h2>RH explicado sem complicação.</h2>
              <p>
                Leituras práticas para contratar melhor, organizar a casa e
                saber quando pedir apoio.
              </p>
            </div>
            <div className="previewGrid">
              <a href="/blog/contratacao-sem-improviso">
                <span>RECRUTAMENTO</span>
                <h3>Contratação sem improviso</h3>
                <p>
                  Um roteiro prático para tirar a vaga da urgência e melhorar a
                  decisão.
                </p>
                <b>Ler artigo →</b>
              </a>
              <a href="/blog/quando-a-empresa-precisa-de-rh">
                <span>GESTÃO DE PESSOAS</span>
                <h3>Quando a empresa precisa de RH?</h3>
                <p>
                  Os sinais de que a rotina de pessoas já não cabe apenas no
                  colo do dono.
                </p>
                <b>Ler artigo →</b>
              </a>
              <a href="/blog/dono-centraliza-decisoes">
                <span>LIDERANÇA</span>
                <h3>Quando o dono centraliza tudo</h3>
                <p>
                  Como criar clareza e autonomia sem perder o controle do
                  negócio.
                </p>
                <b>Ler artigo →</b>
              </a>
            </div>
            <a className="textLink blogAll" href="/blog">
              Ver todos os artigos →
            </a>
          </div>
        </section>
        <section className="section faq shell" id="faq">
          <p className="eyebrow">DÚVIDAS FREQUENTES</p>
          <h2>Antes de conversar, vale saber.</h2>
          {[
            [
              "A Benê substitui meu departamento pessoal?",
              "Não. Folha e obrigações trabalhistas permanecem com profissionais habilitados.",
            ],
            [
              "Preciso contratar um plano mensal?",
              "Não. Você pode começar por uma vaga padrão ou por estruturação.",
            ],
            [
              "Posso cancelar a assinatura a qualquer momento?",
              "Há vigência mínima de três meses e depois aviso de 30 dias.",
            ],
            [
              "A Benê trata denúncias ou temas jurídicos?",
              "Situações sensíveis exigem atendimento humano e podem ser encaminhadas a profissional habilitado.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
        <section className="cta">
          <div className="shell">
            <p className="eyebrow">SEU PRÓXIMO PASSO PODE SER SIMPLES ✦</p>
            <h2>Comece entendendo o que seu RH precisa agora.</h2>
            <div className="centerActions">
              <a className="button lightButton" href="/agendar">
                Agendar uma conversa
              </a>
            </div>
          </div>
        </section>
        <NewsletterSection />
        <BrandMarquee />
      </main>
      <SiteFooter />
    </>
  );
}
