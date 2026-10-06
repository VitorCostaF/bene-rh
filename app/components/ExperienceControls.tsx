'use client';

import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';

type Theme='light'|'dark';

function translatedPath(path:string,toEnglish:boolean){
  if(toEnglish){
    if(path.startsWith('/en'))return path;
    if(path==='/agendar')return '/en/schedule';
    if(path==='/privacidade')return '/en/privacy';
    if(path==='/termos')return '/en/terms';
    if(path.startsWith('/planos/'))return path.replace('/planos/','/en/plans/');
    return `/en${path==='/'?'':path}`;
  }
  if(path==='/en/schedule')return '/agendar';
  if(path==='/en/privacy')return '/privacidade';
  if(path==='/en/terms')return '/termos';
  if(path.startsWith('/en/plans/'))return path.replace('/en/plans/','/planos/');
  const next=path.replace(/^\/en(?=\/|$)/,'');return next||'/';
}

export function ExperienceControls(){
  const[theme,setTheme]=useState<Theme>('light');
  const[reading,setReading]=useState(false);
  const path=usePathname()||'/';
  const en=path.startsWith('/en');
  useEffect(()=>{
    const storedTheme=localStorage.getItem('bene_theme');
    const initialTheme:Theme=storedTheme==='dark'||(!storedTheme&&document.documentElement.dataset.theme==='dark')?'dark':'light';
    const storedReading=localStorage.getItem('bene_reading');
    const initialReading=storedReading==='comfortable'||(!storedReading&&document.documentElement.dataset.reading==='comfortable');
    document.documentElement.dataset.theme=initialTheme;
    document.documentElement.dataset.reading=initialReading?'comfortable':'default';
    const frame=requestAnimationFrame(()=>{setTheme(initialTheme);setReading(initialReading)});
    return()=>cancelAnimationFrame(frame);
  },[]);
  function toggleTheme(){const next=theme==='light'?'dark':'light';setTheme(next);document.documentElement.dataset.theme=next;localStorage.setItem('bene_theme',next)}
  function toggleReading(){const next=!reading;setReading(next);document.documentElement.dataset.reading=next?'comfortable':'default';localStorage.setItem('bene_reading',next?'comfortable':'default')}
  return <div className="experienceControls" role="group" aria-label={en?'Reading and language options':'Opções de leitura e idioma'}>
    <a className="languageButton" href={translatedPath(path,!en)} hrefLang={en?'pt-BR':'en-US'} aria-label={en?'Ver o site em português':'View the site in English'} title={en?'Português':'English'}><span aria-hidden="true">{en?'🇧🇷':'🇺🇸'}</span><b>{en?'PT':'EN'}</b></a>
    <button type="button" onClick={toggleTheme} aria-label={theme==='dark'?(en?'Switch to light theme':'Mudar para o tema claro'):(en?'Switch to dark theme':'Mudar para o tema escuro')} aria-pressed={theme==='dark'} title={en?'Switch light or dark theme':'Alternar tema claro ou escuro'}><span aria-hidden="true">{theme==='dark'?'☀':'◐'}</span><span className="controlLabel">{theme==='dark'?(en?'Light':'Claro'):(en?'Dark':'Escuro')}</span></button>
    <button type="button" onClick={toggleReading} aria-label={en?'Toggle comfortable reading settings':'Ativar ou desativar ajustes de leitura confortável'} aria-pressed={reading} title={en?'Adjust font, spacing and colors for more comfortable reading':'Ajustar fonte, espaçamento e cores para uma leitura mais confortável'}><span aria-hidden="true">Aa</span><span className="controlLabel">{en?'Reading':'Leitura'}</span></button>
  </div>;
}


