import type {Metadata} from 'next';
import {SiteHeader} from '../components/SiteHeader';
import {SiteFooter} from '../components/SiteFooter';
import {SITE_URL} from '../lib/site';
import {CalendlyEmbed} from './CalendlyEmbed';

export const metadata:Metadata={title:'Agendar conversa',description:'Escolha um dia e horário disponível para uma conversa de até 30 minutos com a Benê RH.',alternates:{canonical:'/agendar'},openGraph:{url:`${SITE_URL}/agendar`,title:'Agendar conversa com a Benê RH',description:'Consulte a disponibilidade e confirme uma conversa diretamente na agenda.'}};

export default function Page(){const calendlyUrl=process.env.NEXT_PUBLIC_CALENDLY_URL;return <><SiteHeader/><main id="conteudo" className="schedulePage"><section className="shell scheduleGrid"><div><p className="eyebrow">CONVERSA INICIAL</p><h1>Escolha o melhor dia e horário.</h1><p className="leadSmall">Consulte os horários livres no Calendly e confirme uma conversa diretamente na agenda da Benê, sem etapas intermediárias.</p><div className="scheduleNotes"><div><b>Até 30 minutos</b><span>Para entender contexto e próximo passo.</span></div><div><b>Confirmação imediata</b><span>O compromisso entra na agenda assim que o horário é escolhido.</span></div><div><b>Disponibilidade real</b><span>Apenas horários livres são apresentados.</span></div></div></div><CalendlyEmbed url={calendlyUrl}/></section></main><SiteFooter/></>}
