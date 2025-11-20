import React, { useEffect, useState } from "react";
import { BookOpen, Zap } from "lucide-react";
type Resource = { title: string; score?: number; stars?: string | number; updatedAt?: string; url?: string };
type Opportunity = { title: string; impact?: number; url?: string; recommendation?: string };

function safeNum(s: string, k: string){ const i=s.toLowerCase().indexOf(k); if(i<0) return; let j=i+k.length, d=""; while(j<s.length&&/\d/.test(s[j])) d+=s[j++]; return d?+d:undefined; }
function parseRes(md:string):Resource[]{ const L=md.split(/\r?\n/),a:Resource[]=[]; for(let i=0;i<L.length;i++){ const l=L[i]; if(l.startsWith("- **")){ const t1=l.indexOf("**"),t2=l.indexOf("**",t1+2); const title=t1>=0&&t2>t1?l.slice(t1+2,t2):l.slice(3).trim(); const score=safeNum(l,"score "); let url=""; if(L[i+1]?.startsWith("http")) url=L[i+1].trim(); else if(L[i+2]?.startsWith("http")) url=L[i+2].trim(); a.push({title,score,url}); } } return a.slice(0,5); }
function parseOpp(md:string):Opportunity[]{ const L=md.split(/\r?\n/),o:Opportunity[]=[]; let p=false; for(let i=0;i<L.length&&o.length<3;i++){ const l=L[i]; if(!p && l.toLowerCase().startsWith("## ") && l.toLowerCase().includes("prioritaires")){ p=true; continue;} if(p && l.startsWith("- **")){ const t1=l.indexOf("**"),t2=l.indexOf("**",t1+2); const title=t1>=0&&t2>t1?l.slice(t1+2,t2):l.slice(3).trim(); const impact=safeNum(l,"impact "); const url=L[i+1]?.startsWith("http")?L[i+1].trim():""; o.push({title,impact,url,recommendation:/starter|template|workflow|n8n|zapier|supabase|next|astro/i.test(title)?"Intégrer dans Parlios (outil/page)":"Usage perso / test rapide"});} } return o; }
async function get(u:string){ const r=await fetch(u,{cache:"no-store"}); if(!r.ok) throw new Error(String(r.status)); return r.text(); }
async function getJ(u:string){ const r=await fetch(u,{cache:"no-store"}); if(!r.ok) throw new Error(String(r.status)); return r.json(); }

export default function ParliosIntelCards({ baseUrl }: { baseUrl?: string }){
  const base=(baseUrl||"").replace(/\/$/,""); const path=(p:string)=> base?`${base}/${p}`:`/${p}`;
  const [res,setRes]=useState<Resource[]|null>(null); const [opp,setOpp]=useState<Opportunity[]|null>(null); const [dt,setDt]=useState<string>();
  async function load(){ const ri=await getJ(path("deliverables/research/research_index.json")); const rf=ri?.[0]?.file; if(rf){ const md=await get(path(String(rf).replace(/^\/?/,""))); setRes(parseRes(md)); } const oi=await getJ(path("deliverables/opportunities/opportunities_index.json")); const of=oi?.[0]?.file; if(of){ const md=await get(path(String(of).replace(/^\/?/,""))); setOpp(parseOpp(md)); } setDt(new Date().toISOString().slice(0,10)); }
  useEffect(()=>{ load(); }, [base]); const updated=dt||new Date().toISOString().slice(0,10);
  const R = res??[{title:"(en attente de data UA)",score:0,url:"#"}]; const O = opp??[{title:"(en attente de data UA)",impact:0,url:"#",recommendation:"—"}];

  return (
    <div className="text-white">
      <div className="mb-6"><h1 className="text-2xl md:text-3xl font-bold">Parlios — Veille & Opportunités</h1><p className="text-white/60 text-sm mt-1">MAJ : {updated}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-white/5">
          <div className="flex items-center gap-3"><BookOpen className="w-5 h-5 text-emerald-300"/><h2 className="text-lg font-semibold">Free Resources — Top 5</h2></div>
          <ol className="mt-4 space-y-1">{R.map((r,i)=>(<li key={i} className="flex justify-between"><span>{r.title}</span>{r.url&&<a className="text-emerald-300 text-xs" href={r.url} target="_blank" rel="noreferrer">Ouvrir</a>}</li>))}</ol>
        </div>
        <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-white/5">
          <div className="flex items-center gap-3"><Zap className="w-5 h-5 text-fuchsia-300"/><h2 className="text-lg font-semibold">Opportunités — Top 3</h2></div>
          <ol className="mt-4 space-y-1">{O.map((o,i)=>(<li key={i} className="flex justify-between"><span>{o.title}</span>{o.url&&<a className="text-fuchsia-300 text-xs" href={o.url} target="_blank" rel="noreferrer">Voir</a>}</li>))}</ol>
        </div>
      </div>
    </div>
  );
}
