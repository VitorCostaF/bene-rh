'use client';

import {useEffect} from 'react';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget(options:{url:string;parentElement:HTMLElement}):void;
    };
  }
}

export function CalendlyEmbed({url,locale='pt'}:{url?:string;locale?:'pt'|'en'}){
  useEffect(()=>{
    if(!url)return;
    const container=document.getElementById('calendly-embed');
    if(!container)return;
    const initialize=()=>{
      if(!window.Calendly)return;
      container.innerHTML='';
      window.Calendly.initInlineWidget({url,parentElement:container});
    };
    const existing=document.querySelector<HTMLScriptElement>('script[data-bene-calendly]');
    if(existing){initialize();return}
    const script=document.createElement('script');
    script.src='https://assets.calendly.com/assets/external/widget.js';
    script.async=true;
    script.dataset.beneCalendly='true';
    script.addEventListener('load',initialize,{once:true});
    document.body.appendChild(script);
    return()=>script.removeEventListener('load',initialize);
  },[url]);

  if(!url)return <div className="calendarPending" role="status"><span aria-hidden="true">◷</span><h2>{locale==='en'?'Calendly is being prepared':'Calendly em preparação'}</h2><p>{locale==='en'?'This page is ready for the calendar. The public Benê event link still needs to be added.':'A página está pronta para receber o calendário. Falta apenas adicionar o link público do evento da Benê no Calendly.'}</p></div>;

  return <><div className="calendlyFrame" role="region" aria-label={locale==='en'?'Benê RH availability calendar':'Agenda de horários da Benê RH'}><div id="calendly-embed"/></div><p className="calendarFallback">{locale==='en'?"If the calendar does not work with your device or assistive technology, ":'Se o calendário não funcionar no seu dispositivo ou com sua tecnologia assistiva, '}<a href={url} target="_blank" rel="noopener noreferrer">{locale==='en'?'open the scheduling page directly':'abra a página de agendamento diretamente'}</a>.</p></>;
}
