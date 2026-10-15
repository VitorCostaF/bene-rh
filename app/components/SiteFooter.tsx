'use client';
import {usePathname} from 'next/navigation';
import {Brand} from './Brand';
import {CNPJ,WHATSAPP_DISPLAY,whatsappUrl} from '../lib/site';

export function SiteFooter(){
  const path=usePathname()||'/';const en=path.startsWith('/en');
  return <footer className="footer shell">
    <div className="footerBrand"><Brand id="link-footer-brand" /><p>{en?'On-demand HR for small and medium-sized businesses.':'RH sob demanda para pequenas e médias empresas.'}</p></div>
    <nav aria-label={en?'Institutional links':'Links institucionais'}><a id="link-footer-blog" href={en?'/en/blog':'/blog'}>Blog</a><a id="link-footer-schedule" href={en?'/en/schedule':'/agendar'}>{en?'Schedule':'Agendar'}</a><a id="link-footer-privacy" href={en?'/en/privacy':'/privacidade'}>{en?'Privacy':'Privacidade'}</a><a id="link-footer-terms" href={en?'/en/terms':'/termos'}>{en?'Terms':'Termos'}</a></nav>
    <div className="footerContact"><b>Benê RH</b><span>CNPJ {CNPJ}</span><a id="link-footer-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_DISPLAY}</a></div>
    <small>{en?'© 2026 Benê RH. Informational content; proposals and contracts define each service scope.':'© 2026 Benê RH. Conteúdo informativo; propostas e contratos definem o escopo de cada serviço.'}</small>
  </footer>;
}
