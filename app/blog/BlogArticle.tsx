import type {Article} from './blog-data';
import Link from 'next/link';
import {SiteHeader} from '../components/SiteHeader';
import {SiteFooter} from '../components/SiteFooter';
import {StructuredData} from '../components/StructuredData';
import {SITE_URL,whatsappUrl} from '../lib/site';

export function BlogArticle({article}:{article:Article}){
 const schema={'@context':'https://schema.org','@type':'Article',headline:article.title,description:article.description,mainEntityOfPage:`${SITE_URL}/blog/${article.slug}`,dateModified:'2026-08-28',author:{'@type':'Person',name:'Amanda Stamboni'},publisher:{'@type':'Organization',name:'Benê RH',logo:{'@type':'ImageObject',url:`${SITE_URL}/bene-logo.png`}}};
 return <><StructuredData data={schema}/><SiteHeader/><main id="conteudo" className="articlePage"><header className="articleHero"><div className="articleShell"><p className="breadcrumbs"><Link href="/">Início</Link> / <Link href="/blog">Blog</Link> / {article.category}</p><span className="articleCategory">{article.category}</span><h1>{article.title}</h1><p>{article.description}</p><div className="articleMeta"><span>Por Amanda Stamboni</span><span>{article.reading}</span><span>Atualizado em 28/08/2026</span></div></div></header><article className="articleBody articleShell"><p className="articleIntro">{article.intro}</p>{article.sections.map(section=><section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.items&&<ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul>}</section>)}<div className="articleClosing"><h2>Seu próximo passo</h2><p>{article.closing}</p><div className="heroActions"><a className="button" href={whatsappUrl(`Olá, li o artigo “${article.title}” e quero entender como a Benê pode ajudar minha empresa.`)} target="_blank" rel="noopener noreferrer">Conversar com a Benê</a><Link className="buttonSecondary" href="/#diagnostico">Fazer o diagnóstico</Link></div></div><nav className="articleNav" aria-label="Navegação do blog"><Link href="/blog">← Voltar ao blog</Link><Link href="/agendar">Agendar conversa →</Link></nav></article></main><SiteFooter/></>;
}
