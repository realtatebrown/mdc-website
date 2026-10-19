"use client";
import {useState} from 'react';
import {type NewsItem} from '../content/model';
import {partnerMedia,formatLabels,partnerFeedUrl,type PartnerMedia} from './partner-media-data';
export {partnerMedia,formatLabels} from './partner-media-data';
export type {MediaFormat} from './partner-media-data';
export function mediaAction(item:PartnerMedia){return item.format==='articles'?'Read article':item.url.includes('pod.')?'Listen now':item.format==='films'?'Watch film':'Watch interview';}
function MediaImage({item}:{item:PartnerMedia}){
 const [failed,setFailed]=useState<string[]>([]);
 const source=[item.image,item.portrait].find(src=>src&&!failed.includes(src));
 const portrait=source===item.portrait||item.imageKind==='portrait';
 return <a className={`partner-media-image${portrait?' media-portrait':''}${!source?' media-text-cover':''}`} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.title}>
 {source?<img src={source} alt={portrait?item.partner:item.alt||item.title} width="640" height="360" loading="lazy" onError={()=>setFailed(previous=>[...previous,source])}/>:<span className="media-image-fallback"><small>{item.publisher||formatLabels[item.format]}</small><strong>{item.partner}</strong></span>}
 {portrait&&source&&<span className="media-portrait-label">{item.partner}</span>}
 {item.format!=='articles'&&<span className="media-play" aria-hidden="true">▶</span>}{item.runtime&&<span className="media-runtime">{item.runtime}</span>}</a>;
}
export function MediaCard({item}:{item:PartnerMedia}){return <article className={`partner-media-card partner-media-${item.format}`}>
 <MediaImage key={item.image+item.portrait} item={item}/>
 <div className="partner-media-copy"><div className="partner-media-meta"><span>{formatLabels[item.format]}</span>{item.date&&<time dateTime={item.date}>{new Date((item.date.length===7?item.date+'-01':item.date)+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'})}</time>}</div><p className="partner-media-name"><a href={partnerFeedUrl(item.partner)} aria-label={`View all content from ${item.partner}`}>{item.portrait&&<img className="media-author-portrait" src={item.portrait} alt="" width="32" height="32" loading="lazy" onError={e=>{e.currentTarget.style.display="none";}}/>}{item.partner} <span aria-hidden="true">→</span></a></p><h3><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a></h3><p className="partner-media-summary">{item.summary}</p><div className="partner-media-bottom"><span>{item.publisher}</span><a href={item.url} target="_blank" rel="noopener noreferrer">{mediaAction(item)} ↗</a></div>{item.credit&&<small className="media-credit">{item.credit}</small>}</div>
 </article>;}
export function HomePartnerNews({items,partnerNames,portraits={}}:{items:NewsItem[];partnerNames:string[];portraits?:Record<string,string>}){const media=partnerMedia(items,partnerNames,portraits);return <div className="partner-media-grid">{media.slice(0,3).map(item=><MediaCard key={item.id} item={item}/>)}</div>;}
