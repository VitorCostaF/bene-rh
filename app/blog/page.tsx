import type {Metadata} from 'next';
import Link from 'next/link';
import {SiteHeader} from '../components/SiteHeader';
import {SiteFooter} from '../components/SiteFooter';
import {articles} from './blog-data';
import {SITE_URL} from '../lib/site';

export const metadata:Metadata={title:'Blog de RH para pequenas empresas',description:'Conteúdo prático sobre contratação, liderança, organização e gestão de pessoas para pequenas e médias empresas.',alternates:{canonical:'/blog'},openGraph:{url:`${SITE_URL}/blog`,title:'Blog Benê RH',description:'RH explicado sem complicação para quem lidera pequenas e médias empresas.'}};

export default function Page(){return <><SiteHeader/><main id="conteudo" className="blogPage"><header className="blogHero"><div className="shell"><p className="eyebrow">BLOG BENÊ RH</p><h1>RH explicado sem complicação.</h1><p>Conteúdo prático para contratar melhor, organizar a rotina e tomar decisões de pessoas com mais clareza.</p></div></header><section className="section shell"><div className="blogGrid">{articles.map(article=><article className="articleCard" key={article.slug}><span>{article.category}</span><h2><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2><p>{article.description}</p><footer><small>{article.reading}</small><Link href={`/blog/${article.slug}`}>Ler artigo →</Link></footer></article>)}</div><div className="blogCta"><p className="eyebrow">NÃO SABE POR ONDE COMEÇAR?</p><h2>Descubra qual tema do seu RH pede atenção agora.</h2><Link className="button" href="/#diagnostico">Fazer o Diagnóstico Benê</Link></div></section></main><SiteFooter/></>}
