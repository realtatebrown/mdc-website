"use client";
import {type NewsItem} from '../content/model';
import {partnerMedia,formatLabels,type PartnerMedia} from './partner-media-data';
export {partnerMedia,formatLabels} from './partner-media-data';
export type {MediaFormat} from './partner-media-data';
export function mediaAction(item:PartnerMedia){return item.format==='articles'?'Read article':item.url.includes('pod.')?'Listen now':item.format==='films'?'Watch film':'Watch interview';}
export function MediaCard({item}:{item:PartnerMedia}){return <article className={`partner-media-card partner-media-${item.format}`}>
 <a className="partner-media-image" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.title}><span className="media-image-fallback">{item.partner}</span>{item.image?<img src={item.image} alt={item.alt||item.title} width="640" height="360" loading="lazy" onError={event=>{event.currentTarget.style.display="none";}}/>:null}{item.format!=='articles'&&<span className="media-play" aria-hidden="true">▶</span>}{item.runtime&&<span className="media-runtime">{item.runtime}</span>}</a>
 <div className="partner-media-copy"><div className="partner-media-meta"><span>{formatLabels[item.format]}</span>{item.date&&<time dateTime={item.date}>{new Date((item.date.length===7?item.date+'-01':item.date)+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'})}</time>}</div><p className="partner-media-name">{item.partner}</p><h3><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a></h3><p className="partner-media-summary">{item.summary}</p><div className="partner-media-bottom"><span>{item.publisher}</span><a href={item.url} target="_blank" rel="noopener noreferrer">{mediaAction(item)} ↗</a></div>{item.credit&&<small className="media-credit">{item.credit}</small>}</div>
 </article>;}
export function HomePartnerNews({items,partnerNames}:{items:NewsItem[];partnerNames:string[]}){const media=partnerMedia(items,partnerNames);return <div className="partner-media-grid">{media.slice(0,3).map(item=><MediaCard key={item.id} item={item}/>)}</div>;}
