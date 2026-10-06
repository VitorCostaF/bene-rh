import { mkdirSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { dirname, resolve } from 'node:path';

type Payload={email?:unknown;consent?:unknown;locale?:unknown;source?:unknown;website?:unknown};
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const databasePath = resolve(process.env.BENE_DATA_DIR || './data', 'bene-rh.sqlite');
mkdirSync(dirname(databasePath), { recursive: true });
const database = new DatabaseSync(databasePath);
database.exec(`
  CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL COLLATE NOCASE,
    locale TEXT NOT NULL DEFAULT 'pt',
    source TEXT NOT NULL DEFAULT 'site',
    consented_at TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'subscribed'
  );
  CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_subscribers_email
    ON newsletter_subscribers(email);
`);
const saveSubscriber = database.prepare(`
  INSERT INTO newsletter_subscribers (email, locale, source, consented_at, status)
  VALUES (?, ?, ?, ?, 'subscribed')
  ON CONFLICT(email) DO UPDATE SET
    locale = excluded.locale,
    source = excluded.source,
    consented_at = excluded.consented_at,
    status = 'subscribed'
`);

export async function POST(request:Request){
  let body:Payload;
  try{body=await request.json() as Payload}catch{return Response.json({message:'Invalid request.'},{status:400})}
  if(body.website)return Response.json({ok:true});
  const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';
  if(body.consent!==true)return Response.json({message:'Consent is required.'},{status:400});
  if(email.length>254||!emailPattern.test(email))return Response.json({message:'Enter a valid email.'},{status:400});
  const locale=body.locale==='en'?'en':'pt';
  const source=typeof body.source==='string'?body.source.replace(/[^a-z0-9_-]/gi,'').slice(0,40)||'site':'site';
  saveSubscriber.run(email,locale,source,new Date().toISOString());
  return Response.json({ok:true});
}
