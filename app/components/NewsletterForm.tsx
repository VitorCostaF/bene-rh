'use client';

import {FormEvent,useRef,useState} from 'react';

type Locale='pt'|'en';

export function NewsletterForm({locale='pt',compact=false,source='site'}:{locale?:Locale;compact?:boolean;source?:string}){
  const[email,setEmail]=useState('');
  const[consent,setConsent]=useState(false);
  const[status,setStatus]=useState<'idle'|'loading'|'success'|'error'>('idle');
  const[message,setMessage]=useState('');
  const honeypot=useRef<HTMLInputElement>(null);
  const en=locale==='en';

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(!consent){setStatus('error');setMessage(en?'Please confirm that you agree to receive the newsletter.':'Confirme que concorda em receber a newsletter.');return}
    setStatus('loading');setMessage('');
    try{
      const response=await fetch('/api/newsletter',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,consent,locale,source,website:honeypot.current?.value||''})});
      const data=await response.json() as {message?:string};
      if(!response.ok)throw new Error(data.message||'error');
      setStatus('success');
      setMessage(en?'You are on the Benê list. We will only send relevant HR content.':'Você entrou na lista da Benê. Enviaremos apenas conteúdos relevantes sobre RH.');
      setEmail('');setConsent(false);
    }catch{
      setStatus('error');
      setMessage(en?'We could not save your email. Please try again in a moment.':'Não foi possível salvar seu e-mail. Tente novamente em instantes.');
    }
  }

  return <form className={compact?'newsletterForm compact':'newsletterForm'} onSubmit={submit} noValidate>
    <div className="newsletterField">
      <label htmlFor={`newsletter-email-${source}`}>{en?'Work email':'E-mail profissional'}</label>
      <div className="newsletterInputRow"><input id={`newsletter-email-${source}`} type="email" inputMode="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder={en?'you@company.com':'voce@empresa.com.br'} required/><button className="button" type="submit" disabled={status==='loading'}>{status==='loading'?(en?'Saving…':'Salvando…'):(en?'Join the list':'Quero receber')}</button></div>
    </div>
    <label className="consentCheck"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} aria-invalid={status==='error'&&!consent} aria-describedby={status==='error'&&!consent?`newsletter-error-${source}`:undefined}/><span>{en?'I agree to receive Benê RH content and know I can unsubscribe at any time.':'Concordo em receber conteúdos da Benê RH e sei que posso sair da lista a qualquer momento.'} <a href={en?'/en/privacy':'/privacidade'}>{en?'Privacy notice':'Aviso de privacidade'}</a>.</span></label>
    <input ref={honeypot} className="honey" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
    {message&&<p id={`newsletter-error-${source}`} className={`formMessage ${status}`} role={status==='error'?'alert':'status'}>{message}</p>}
  </form>;
}

export function NewsletterSection({locale='pt'}:{locale?:Locale}){
  const en=locale==='en';
  return <section className="section newsletterSection" id={en?'newsletter-en':'newsletter'}><div className="shell newsletterGrid"><div><p className="eyebrow">{en?'BENÊ NEWSLETTER':'NEWSLETTER BENÊ'}</p><h2>{en?'Practical HR guidance, delivered without complications.':'RH prático, sem complicação, direto no seu e-mail.'}</h2><p>{en?'Receive useful guidance on hiring, leadership and people management for growing companies.':'Receba orientações úteis sobre contratação, liderança e gestão de pessoas para empresas em crescimento.'}</p></div><NewsletterForm locale={locale} source={en?'home-en':'home-pt'}/></div></section>;
}
