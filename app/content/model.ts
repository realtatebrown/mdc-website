import {z} from 'zod';
import {stateNames} from './states';
const text=z.string().max(6000).transform(s=>s.trim());
function isHttps(s:string){try{const parsed=new URL(s);return parsed.protocol==='https:'&&!!parsed.hostname&&!parsed.username&&!parsed.password&&!/\s/.test(s);}catch{return false;}}
const url=text.refine(s=>!s||isHttps(s),'Use an HTTPS URL');
const image=text.refine(s=>!s||isHttps(s)||/^\/assets\/[^\s]+$/.test(s),'Use HTTPS or an /assets/ image');
const base={id:z.string().trim().min(1).max(200),status:z.literal('Published')};
const partner=z.object({...base,name:z.string().trim().min(1),kind:z.enum(['Organization','Individual']),state:text,city:text,url,bio:text,image,featured:z.boolean()}).refine(p=>p.kind==='Individual'||Object.values(stateNames).includes(p.state),'Organization needs a US state');
const date=text.refine(s=>!s||(/^\d{4}-(0[1-9]|1[0-2])(-(?:0[1-9]|[12]\d|3[01]))?$/.test(s)&&(s.length===7||new Date(s+'T12:00:00Z').toISOString().slice(0,10)===s)),'Use YYYY-MM-DD or YYYY-MM');
const news=z.object({...base,section:z.enum(['updates','press']),title:z.string().trim().min(1),date,publisher:text,author:text,category:z.enum(['Reporting','Interviews','Opinion & analysis','Coalition updates']),summary:text,url:url.refine(Boolean),image,alt:text,credit:text,featured:z.boolean()});
const schema=z.object({schemaVersion:z.literal(1),partners:z.array(partner).max(3000),news:z.array(news).max(5000)});
export type Content=z.infer<typeof schema>;
export type NewsItem=Content['news'][number];
export function parseContent(input:unknown):Content {
 if(!input||typeof input!=='object')throw Error('Invalid content feed');
 const raw=input as Record<string,unknown>;
 // Filter first: drafts never reach a page or its client props, even with a misconfigured feed.
 const published=(value:unknown)=>Array.isArray(value)?value.filter(r=>r&&typeof r==='object'&&r.status==='Published'):value;
 const result=schema.parse({...raw,partners:published(raw.partners),news:published(raw.news)});
 for(const rows of [result.partners,result.news]){const ids=new Set<string>();for(const row of rows){if(ids.has(row.id))throw Error('Duplicate content ID');ids.add(row.id);}}
 if(new Set(result.partners.map(p=>p.name)).size!==result.partners.length)throw Error('Duplicate partner name');
 result.news=result.news.map(n=>({...n,category:n.section==='updates'?'Coalition updates':n.category==='Coalition updates'?'Reporting':n.category}));
 return result;
}
export function partnerViews(content:Content){
 const groups=new Map<string,string[]>();
 for(const p of content.partners.filter(p=>p.kind==='Organization'))groups.set(p.state,[...(groups.get(p.state)||[]),p.name]);
 const states=[...groups.entries()].sort((a,b)=>a[0].localeCompare(b[0]));
 const codes=Object.fromEntries(Object.entries(stateNames).map(([code,name])=>[name,code]));
 return {states,individuals:content.partners.filter(p=>p.kind==='Individual').map(p=>[p.name,p.bio,p.image]),locations:states.map(([state,partners])=>({state:codes[state],city:'',lat:0,lon:0,partners})),links:Object.fromEntries(content.partners.map(p=>[p.name,p.url])),images:Object.fromEntries(content.partners.map(p=>[p.name,p.image])),profiles:Object.fromEntries(content.partners.filter(p=>p.kind==='Individual'&&p.url).map(p=>[p.name,{url:p.url,label:p.url.includes('x.com/')?'@'+new URL(p.url).pathname.split('/').filter(Boolean)[0]+' on X':'View website'}]))};
}
export function sortedNews(news:NewsItem[]){return [...news].sort((a,b)=>b.date.localeCompare(a.date)||a.title.localeCompare(b.title));}
export function featuredNews(news:NewsItem[]){return [...sortedNews(news)].sort((a,b)=>Number(b.featured)-Number(a.featured)).slice(0,3);}
