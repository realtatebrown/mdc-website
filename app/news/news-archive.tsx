"use client";
import { useState } from 'react';
import coverage from './coverage.json';
import { stories } from '../news-story';
import type { NewsSection } from './news-content';

export const archiveStories = [...coverage, ...stories.map(story => ({
  ...story, category: story.type === 'Coalition activity' ? 'Coalition updates' : 'Opinion & analysis'
}))].sort((a,b) => b.date.localeCompare(a.date) || a.publisher.localeCompare(b.publisher));
const categories = ['Reporting', 'Interviews', 'Opinion & analysis', 'Coalition updates'];

export function filterCoverage(query: string, category: string, publisher: string) {
  const words=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return archiveStories.filter(story => (!category || story.category===category) && (!publisher || story.publisher===publisher) && words.every(word=>`${story.title} ${story.publisher} ${story.summary}`.toLowerCase().includes(word)));
}
export function coverageDate(date: string) {
  if (!date) return "Date not listed";
  return new Date(`${date.length===7?date+'-01':date}T12:00:00Z`).toLocaleDateString('en-US',{year:'numeric',month:'long',...(date.length===10?{day:'numeric'}:{}),timeZone:'UTC'});
}
export default function NewsArchive({section='all'}: {section?:NewsSection}) {
  const [query,setQuery]=useState(''); const [category,setCategory]=useState(section==='updates'?'Coalition updates':''); const [publisher,setPublisher]=useState('');
  const sectionStories = archiveStories.filter(story => section === 'updates' ? story.category === 'Coalition updates' : section === 'press' ? story.category !== 'Coalition updates' : true);
  const publishers = [...new Set(sectionStories.map(story => story.publisher))].sort();
  const hasFilters = !!query.trim() || !!publisher || (section !== 'updates' && !!category);
  const featuredUrls = new Set(stories.map(story => story.url));
  const searching = section!=='all' || !!query.trim() || !!category || !!publisher;
  const matches=filterCoverage(query,category,publisher).filter(story => (section!=='press' || story.category!=='Coalition updates') && (searching || !featuredUrls.has(story.url)));
  const months=[...new Set(matches.map(story=>story.date.slice(0,7)))];
  return <section className="coverage-archive" aria-labelledby="coverage-title">
    <div className="coverage-heading"><div><span className="section-index">In the news</span><h2 id="coverage-title">{section==='updates'?'Coalition updates':section==='press'?'Press coverage':'Coverage archive'}</h2></div></div>
    <form className="coverage-controls" role="search" onSubmit={event=>event.preventDefault()}>
      <label htmlFor="coverage-query">Search coverage<input id="coverage-query" type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search by title, outlet, or topic" /></label>
      <label htmlFor="coverage-type">Type<select id="coverage-type" disabled={section==='updates'} value={category} onChange={event=>setCategory(event.target.value)}><option value="">All coverage</option>{categories.filter(item=>section!=='press'||item!=='Coalition updates').map(item=><option key={item}>{item}</option>)}</select></label>
      <label htmlFor="coverage-outlet">Outlet<select id="coverage-outlet" value={publisher} onChange={event=>setPublisher(event.target.value)}><option value="">All outlets</option>{publishers.map(item=><option key={item}>{item}</option>)}</select></label>
    </form>
    <div className="coverage-status"><p aria-live="polite">{matches.length} {matches.length===1?'item':'items'}{hasFilters ? ` of ${sectionStories.length}`:''}</p>{hasFilters && <button type="button" onClick={()=>{setQuery('');setCategory(section==='updates'?'Coalition updates':'');setPublisher('');}}>Clear filters</button>}</div>
    {months.map(month=><section className="coverage-month" key={month} aria-labelledby={`month-${month}`}><h3 id={`month-${month}`}>{month ? coverageDate(month) : "More updates and coverage"}</h3><div>{matches.filter(story=>story.date.slice(0,7)===month).map(story=><article className="coverage-row" key={story.url}>
      <div className="coverage-meta"><span>{story.publisher}</span><time dateTime={story.date || undefined}>{coverageDate(story.date)}</time><span className="coverage-type">{story.category}</span></div>
      <div className="coverage-copy"><h4><a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a></h4><p>{story.summary}</p><a className="coverage-read" href={story.url} target="_blank" rel="noopener noreferrer">{story.url.includes('youtube.com/watch') ? 'Watch documentary' : story.url.includes('x.com/') ? 'View post' : story.category==='Interviews'?'Watch or listen':'Read article'}<span className="sr-only">: {story.title}</span></a></div>
    </article>)}</div></section>)}
    {matches.length===0 && <div className="coverage-empty"><h3>No matching coverage</h3><p>Try another title, outlet, or topic, or clear the filters.</p></div>}
  </section>;
}
