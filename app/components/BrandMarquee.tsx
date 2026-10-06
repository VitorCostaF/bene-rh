'use client';

/* eslint-disable @next/next/no-img-element */
import {useState} from 'react';

const brands=[
  {name:'Consultoria Stamboni',wordmark:true},
  {name:'Zênite Escola de Negócios',image:'zenite.png'},
  {name:'Lore',wordmark:true},
  {name:'GO PET',image:'go-pet-v2.png'},
  {name:'Benê RH',image:'bene-rh.png'},
  {name:'InovaCompany IA',image:'inovacompany-ia.png'},
  {name:'Pragma',image:'pragma-v2.png'},
  {name:'Saúde Feminina',image:'saude-feminina.png'},
  {name:'AV Magazine',image:'av-magazine.png'},
  {name:'Zeladeira',image:'zeladeira.png'},
  {name:'Vai Bonita',image:'vai-bonita.png'},
  {name:'Desenrolados',image:'desenrolados.png'},
  {name:'Fábrica de App',image:'fabrica-de-app.png'},
  {name:'Pronto',image:'pronto.png'},
  {name:'Trabalhista.ai',image:'trabalhista-ai.png'},
  {name:'Prumo',image:'prumo.svg'},
  {name:'Bia',image:'bia.png'},
  {name:'Inova Dados',image:'inova-dados.png'},
];

function BrandSet({duplicate=false}:{duplicate?:boolean}){
  return <ul className="ecosystemSet" aria-hidden={duplicate||undefined}>
    {brands.map((brand)=><li className="ecosystemItem" key={brand.name}>
      {brand.wordmark?<span className="ecosystemWordmark">{brand.name}</span>:<img src={`https://amandastamboni.com.br/assets/brands/${brand.image}`} width="180" height="72" loading="lazy" decoding="async" alt={duplicate?'':brand.name}/>}
    </li>)}
  </ul>;
}

export function BrandMarquee({locale='pt'}:{locale?:'pt'|'en'}){
  const[paused,setPaused]=useState(false);
  const en=locale==='en';
  return <section className="ecosystemSection" aria-labelledby="ecosystem-title">
    <div className="shell ecosystemIntro">
      <p className="eyebrow">{en?'AMANDA STAMBONI ECOSYSTEM':'MARCAS DO ECOSSISTEMA'}</p>
      <h2 id="ecosystem-title">{en?'Ideas that become brands, products and businesses.':'Marcas e projetos criados dentro do ecossistema Amanda Stamboni.'}</h2>
    </div>
    <div className="ecosystemViewport">
      <div className="ecosystemTrack" data-paused={paused}>
        <BrandSet/><BrandSet duplicate/>
      </div>
    </div>
    <div className="shell ecosystemControls">
      <p>{en?'These are our own brands and projects.':'São marcas próprias e projetos do nosso ecossistema.'}</p>
      <button type="button" className="ecosystemToggle" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?(en?'Resume motion':'Retomar movimento'):(en?'Pause motion':'Pausar movimento')}</button>
    </div>
  </section>;
}

