"use client";
import { useEffect, useState } from 'react';
import { NewsGrid } from '../news-story';
import VideoFeature from '../video-feature';
import NewsArchive from './news-archive';
export type NewsSection = 'all' | 'updates' | 'press';
const sections = [{id:'all',label:'All news'},{id:'updates',label:'Coalition updates'},{id:'press',label:'Press coverage'}] as const;
export default function NewsContent() {
 const [section,setSection]=useState<NewsSection>('all');
 useEffect(()=>{
  const sync=()=>{const value=new URLSearchParams(window.location.search).get('section');setSection(value==='updates'||value==='press'?value:'all');};
  sync();window.addEventListener('popstate',sync);return()=>window.removeEventListener('popstate',sync);
 },[]);
 return <>
  <div className="news-section-tabs" aria-label="News categories">{sections.map(item=><button type="button" key={item.id} aria-pressed={section===item.id} onClick={()=>{setSection(item.id);const url=new URL(window.location.href);if(item.id==='all')url.searchParams.delete('section');else url.searchParams.set('section',item.id);window.history.pushState(null,'',url);}}>{item.label}</button>)}</div>
  {section==='all' && <section className="news-page-stories" aria-label="Featured articles"><NewsGrid /><VideoFeature /></section>}
  {section==='press' && <section className="news-page-stories" aria-label="Featured interview"><VideoFeature /></section>}
  <NewsArchive key={section} section={section} />
 </>;
}
