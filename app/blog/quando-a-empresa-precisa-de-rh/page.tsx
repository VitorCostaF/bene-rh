import type {Metadata} from 'next';
import {BlogArticle} from '../BlogArticle';
import {getArticle} from '../blog-data';
import {SITE_URL} from '../../lib/site';
const article=getArticle('quando-a-empresa-precisa-de-rh')!;
export const metadata:Metadata={title:article.title,description:article.description,alternates:{canonical:`/blog/${article.slug}`},openGraph:{type:'article',url:`${SITE_URL}/blog/${article.slug}`,title:article.title,description:article.description}};
export default function Page(){return <BlogArticle article={article}/>}
