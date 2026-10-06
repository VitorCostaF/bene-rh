'use client';
import {usePathname} from 'next/navigation';
import {whatsappUrl} from '../lib/site';

export function WhatsAppButton(){
  const path=usePathname()||'/';
  if(path==='/agendar'||path==='/en/schedule')return null;
  const en=path.startsWith('/en');
  return <a className="whatsappFloat" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label={en?'Talk to Benê RH on WhatsApp':'Conversar com a Benê RH pelo WhatsApp'}><span aria-hidden="true">{en?'Talk on WhatsApp':'Falar no WhatsApp'}</span></a>;
}
