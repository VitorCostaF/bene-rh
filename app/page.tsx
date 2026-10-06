import type {Metadata} from 'next';
import HomeClient from './HomeClient';
import {StructuredData} from './components/StructuredData';
import {SITE_URL} from './lib/site';

export const metadata:Metadata={
  title:'RH sob demanda para pequenas empresas',
  description:'Contratação, organização e gestão de pessoas para sua PME crescer sem improviso. Faça o Diagnóstico Benê gratuito.',
  alternates:{canonical:'/'},
  openGraph:{url:SITE_URL,title:'RH sob demanda para pequenas empresas | Benê RH',description:'Contratação, organização e gestão de pessoas para sua PME crescer sem improviso.',type:'website'},
};

const services={
  '@context':'https://schema.org','@type':'ItemList',name:'Soluções Benê RH',
  itemListElement:[
    {'@type':'Service',position:1,name:'Recrutamento e seleção sob demanda',url:`${SITE_URL}/#recrutamento`},
    {'@type':'Service',position:2,name:'Diagnóstico e estruturação de RH',url:`${SITE_URL}/#estruturacao`},
    {'@type':'Service',position:3,name:'RH por assinatura para PMEs',url:`${SITE_URL}/#planos`},
  ],
};

const faq={
  '@context':'https://schema.org','@type':'FAQPage',mainEntity:[
    ['A Benê substitui meu departamento pessoal?','Não. Folha e obrigações trabalhistas permanecem com profissionais habilitados.'],
    ['Preciso contratar um plano mensal?','Não. Você pode começar por uma vaga padrão ou por estruturação.'],
    ['O Diagnóstico entrega um plano completo?','Não. Ele indica maturidade, dor prioritária e rota.'],
    ['Posso cancelar a assinatura a qualquer momento?','Há vigência mínima de três meses e depois aviso de 30 dias.'],
  ].map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}})),
};

export default function Page(){return <><StructuredData data={services}/><StructuredData data={faq}/><HomeClient/></>}
