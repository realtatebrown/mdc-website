"use client";
import {sortedNews,type NewsItem} from '../content/model';
export type MediaFormat='articles'|'films'|'interviews';
export type PartnerMedia=NewsItem & {format:MediaFormat;partner:string;runtime?:string};
export const formatLabels:Record<MediaFormat,string>={articles:'Articles',films:'Documentaries & Specials',interviews:'Interviews & Podcasts'};
const selections:Record<string,{format:MediaFormat;partner:string;runtime?:string;image?:string}>={
 '-i-m-horrified-92-year-old-returns-to-london-after-50-years':{format:'films',partner:'Steven Edginton',runtime:'28 min',image:'https://i.ytimg.com/vi/EYHWpMswzOI/hqdefault.jpg'},
 'the-promise-was-mass-deportation-the-policy-is-carve-outs':{format:'articles',partner:'Scott Mechkowski'},
 'a-playbook-for-mass-deportations':{format:'articles',partner:'Kyle Brosnan · Oversight Project'},
 'jason-killmeyer-tomi-lahren':{format:'interviews',partner:'Jason Killmeyer',image:'https://i.ytimg.com/vi/XpRlxJxgZ1k/hqdefault.jpg'},
 'mike-howell-on-immigration-in-britain-and-the-united-states':{format:'interviews',partner:'Mike Howell · Oversight Project',image:'https://i.ytimg.com/vi/aa86D8-n1JA/hqdefault.jpg'},
};
export function partnerMedia(items:NewsItem[]):PartnerMedia[]{return sortedNews(items).flatMap(item=>selections[item.id]?[{...item,...selections[item.id]}]:[]);}
export function mediaAction(item:PartnerMedia){return item.format==='articles'?'Read article':item.url.includes('pod.')?'Listen now':item.format==='films'?'Watch film':'Watch interview';}
export function MediaCard({item}:{item:PartnerMedia}){return <article className={`partner-media-card partner-media-${item.format}`}>
 <a className="partner-media-image" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.title}><span className="media-image-fallback">{item.partner}</span>{item.image?<img src={item.image} alt={item.alt||item.title} width="640" height="360" loading="lazy" onError={event=>{event.currentTarget.style.display="none";}}/>:null}{item.format!=='articles'&&<span className="media-play" aria-hidden="true">▶</span>}{item.runtime&&<span className="media-runtime">{item.runtime}</span>}</a>
 <div className="partner-media-copy"><div className="partner-media-meta"><span>{formatLabels[item.format]}</span>{item.date&&<time dateTime={item.date}>{new Date((item.date.length===7?item.date+'-01':item.date)+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'})}</time>}</div><p className="partner-media-name">{item.partner}</p><h3><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a></h3><p className="partner-media-summary">{item.summary}</p><div className="partner-media-bottom"><span>{item.publisher}</span><a href={item.url} target="_blank" rel="noopener noreferrer">{mediaAction(item)} ↗</a></div>{item.credit&&<small className="media-credit">{item.credit}</small>}</div>
 </article>;}
export function HomePartnerNews({items}:{items:NewsItem[]}){const media=partnerMedia(items);return <div className="partner-media-grid">{media.slice(0,3).map(item=><MediaCard key={item.id} item={item}/>)}</div>;}
