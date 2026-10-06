import type {Metadata} from 'next';import PlanDetail from '../PlanDetail';import {plans} from '../plan-data';import {SITE_URL} from '../../lib/site';
export const metadata:Metadata={title:'Benê Pro — Gestão de RH para PMEs',description:'Gestão de pessoas, recrutamento, treinamento, cultura e indicadores para empresas com até 30 pessoas.',alternates:{canonical:'/planos/pro'},openGraph:{url:`${SITE_URL}/planos/pro`,title:'Benê Pro | Gestão de RH para PMEs',description:'RH estruturado para empresas que estão crescendo.'}};
export default function Page(){return <PlanDetail plan={plans.pro}/>}
