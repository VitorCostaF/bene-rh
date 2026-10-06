import type {Metadata} from 'next';
import {DM_Sans,DM_Serif_Display} from 'next/font/google';
import './globals.css';
import {StructuredData} from './components/StructuredData';
import {WhatsAppButton} from './components/WhatsAppButton';
import {BeneAssistant} from './components/BeneAssistant';
import {SkipLink} from './components/SkipLink';
import {defaultMetadata,isIndexable,organizationSchema,SITE_URL} from './lib/site';
const sans=DM_Sans({variable:'--font-sans',subsets:['latin']});
const display=DM_Serif_Display({variable:'--font-display',weight:'400',subsets:['latin']});
export const metadata:Metadata={
  metadataBase:new URL(SITE_URL),
  title:{default:defaultMetadata.title,template:'%s | Benê RH'},
  description:defaultMetadata.description,
  robots:{index:isIndexable,follow:isIndexable},
  openGraph:{title:defaultMetadata.title,description:defaultMetadata.description,url:SITE_URL,siteName:'Benê RH',locale:'pt_BR',type:'website',images:[{url:'/bene-logo.png',width:1528,height:492,alt:'Benê RH'}]},
  twitter:{card:'summary_large_image',title:defaultMetadata.title,description:defaultMetadata.description,images:['/bene-logo.png']},
  icons:{icon:[{url:'/bene-favicon.png',type:'image/png'}]},
  manifest:'/manifest.webmanifest',
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{var t=localStorage.getItem('bene_theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.reading=localStorage.getItem('bene_reading')==='comfortable'?'comfortable':'default';if(location.pathname.indexOf('/en')===0)document.documentElement.lang='en-US'}catch(e){}`}}/></head><body className={`${sans.variable} ${display.variable}`}><SkipLink/><StructuredData data={organizationSchema}/>{children}<BeneAssistant/><WhatsAppButton/></body></html>}

