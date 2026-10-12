"use client";
import {useEffect,useState} from 'react';
import type {NewsItem} from '../content/model';
import DocumentaryFeature from '../documentary-feature';
import {featuredFilm} from './partner-media-data';
import NewsArchive from './news-archive';
import {partnerMedia,MediaCard,formatLabels,type MediaFormat} from './partner-media';
export type NewsSection='all'|'updates'|'press';
export default function NewsContent({items,partnerNames}:{items:NewsItem[];partnerNames:string[]}){
 const media=partnerMedia(items,partnerNames);const featured=featuredFilm(items,partnerNames);
 const [format,setFormat]=useState<MediaFormat|'all'>('all');const [query,setQuery]=useState('');const [section,setSection]=useState<NewsSection>('all');
 useEffect(()=>{const sync=()=>{const p=new URLSearchParams(location.search);const f=p.get('format');setFormat(f==='articles'||f==='films'||f==='interviews'?f:'all');const s=p.get('section');setSection(s==='updates'||s==='press'?s:'all');};sync();addEventListener('popstate',sync);return()=>removeEventListener('popstate',sync);},[]);
 const matches=media.filter(item=>(format==='all'||item.format===format)&&`${item.title} ${item.partner} ${item.publisher} ${item.summary}`.toLowerCase().includes(query.trim().toLowerCase()));
 return <>
 <DocumentaryFeature story={featured} news/>
 <section className="partner-media-library" aria-labelledby="partner-library-title"><div className="partner-library-heading"><div><h2 id="partner-library-title">From our partners</h2></div><label className="partner-media-search">Search partner work<input type="search" placeholder="Partner, title, or topic" value={query} onChange={e=>setQuery(e.target.value)}/></label></div>
 <div className="partner-format-tabs" aria-label="Filter partner work by format">{(['all','articles','films','interviews'] as const).map(value=><button key={value} aria-pressed={format===value} onClick={()=>{setFormat(value);const url=new URL(location.href);if(value==='all')url.searchParams.delete('format');else url.searchParams.set('format',value);history.pushState(null,'',url);}}>{value==='all'?'All':formatLabels[value]}<span>{media.filter(item=>value==='all'||item.format===value).length}</span></button>)}</div>
 <p className="partner-results" aria-live="polite">{matches.length} {matches.length===1?'piece':'pieces'}{query?' matching your search':''}</p><div className="partner-media-grid">{matches.map(item=><MediaCard key={item.id} item={item}/>)}</div>{matches.length===0&&<div className="partner-empty"><h3>No matching pieces</h3><p>Try another partner, title, or format.</p><button onClick={()=>{setQuery('');setFormat('all');const url=new URL(location.href);url.searchParams.delete('format');history.replaceState(null,'',url);}}>Clear filters</button></div>}
 </section>
 <section className="coalition-news-secondary" aria-labelledby="coalition-secondary-title"><div className="coalition-secondary-heading"><span className="section-index">More from MDC</span><h2 id="coalition-secondary-title">Coalition updates &amp; press</h2><p>Announcements from the coalition and coverage of our work.</p></div><div className="news-section-tabs">{(['all','updates','press'] as const).map(value=><button key={value} aria-pressed={section===value} onClick={()=>{setSection(value);const url=new URL(location.href);if(value==='all')url.searchParams.delete('section');else url.searchParams.set('section',value);history.pushState(null,'',url);}}>{value==='all'?'All':value==='updates'?'Coalition updates':'Press coverage'}</button>)}</div><NewsArchive key={section} section={section} items={items.filter(item=>!media.some(piece=>piece.id===item.id))}/></section>
 </>;
}
