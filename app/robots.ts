import type {MetadataRoute} from 'next';
import {isIndexable,SITE_URL} from './lib/site';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:isIndexable?'/':undefined,disallow:isIndexable?undefined:'/'},sitemap:`${SITE_URL}/sitemap.xml`,host:SITE_URL}}
