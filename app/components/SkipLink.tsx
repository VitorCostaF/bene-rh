'use client';
import {usePathname} from 'next/navigation';
export function SkipLink(){const en=(usePathname()||'/').startsWith('/en');return <a className="skipLink" href="#conteudo">{en?'Skip to content':'Pular para o conteúdo'}</a>}
