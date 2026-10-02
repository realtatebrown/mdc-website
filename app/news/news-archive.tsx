"use client";
import { useState } from 'react';
import coverage from './coverage.json';
import { stories } from '../news-story';

export const archiveStories = [...coverage, ...stories.map(story => ({
  ...story, category: story.type === 'Coalition activity' ? 'Coalition updates' : 'Opinion & analysis'
}))].sort((a,b) => b.date.localeCompare(a.date) || a.publisher.localeCompare(b.publisher));
const categories = ['Reporting', 'Interviews', 'Opinion & analysis', 'Coalition updates'];
const publishers = [...new Set(archiveStories.map(story=>story.publisher))].sort();
export function filterCoverage(query: string, category: string, publisher: string) {
  const words=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return archiveStories.filter(story => (!category || story.category===category) && (!publisher || story.publisher===publisher) && words.every(word=>`${story.title} ${story.publisher} ${story.summary}`.toLowerCase().includes(word)));
}
export function coverageDate(date: string) {
  if (!date) return "Date not listed";
  return new Date(`${date.length===7?date+'-01':date}T12:00:00Z`).toLocaleDateString('en-US',{year:'numeric',month:'long',...(date.length===10?{day:'numeric'}:{}),timeZone:'UTC'});
}
export default function NewsArchive() {
  const [query,setQuery]=useState(''); const [category,setCategory]=useState(''); const [publisher,setPublisher]=useState('');
  const matches=filterCoverage(query,category,publisher);
  const months=[...new Set(matches.map(story=>story.date.slice(0,7)))];
  return <section className="coverage-archive" aria-labelledby="coverage-title">
    <div className="coverage-heading"><div><span className="section-index">In the news</span><h2 id="coverage-title">Coverage archive</h2></div><p>Reporting, interviews, commentary, and coalition updates.</p></div>
    <form className="coverage-controls" role="search" onSubmit={event=>event.preventDefault()}>
      <label htmlFor="coverage-query">Search coverage<input id="coverage-query" type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search by title, outlet, or topic" /></label>
      <label htmlFor="coverage-type">Type<select id="coverage-type" value={category} onChange={event=>setCategory(event.target.value)}><option value="">All coverage</option>{categories.map(item=><option key={item}>{item}</option>)}</select></label>
      <label htmlFor="coverage-outlet">Outlet<select id="coverage-outlet" value={publisher} onChange={event=>setPublisher(event.target.value)}><option value="">All outlets</option>{publishers.map(item=><option key={item}>{item}</option>)}</select></label>
    </form>
    <div className="coverage-status"><p aria-live="polite">{matches.length} {matches.length===1?'item':'items'}{query || category || publisher ? ` of ${archiveStories.length}`:''}</p>{(query || category || publisher) && <button type="button" onClick={()=>{setQuery('');setCategory('');setPublisher('');}}>Clear filters</button>}</div>
    {months.map(month=><section className="coverage-month" key={month} aria-labelledby={`month-${month}`}><h3 id={`month-${month}`}>{month ? coverageDate(month) : "More interviews"}</h3><div>{matches.filter(story=>story.date.slice(0,7)===month).map(story=><article className="coverage-row" key={story.url}>
      <div className="coverage-meta"><span>{story.publisher}</span><time dateTime={story.date || undefined}>{coverageDate(story.date)}</time><span className="coverage-type">{story.category}</span></div>
      <div className="coverage-copy"><h4><a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a></h4><p>{story.summary}</p><a className="coverage-read" href={story.url} target="_blank" rel="noopener noreferrer">{story.category==='Interviews'?'Watch or listen':'Read at source'}<span className="sr-only">: {story.title}</span></a></div>
    </article>)}</div></section>)}
    {matches.length===0 && <div className="coverage-empty"><h3>No matching coverage</h3><p>Try another title, outlet, or topic, or clear the filters.</p></div>}
  </section>;
}
