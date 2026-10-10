"use client";
import { useEffect, useMemo, useRef, useState } from "react";
type Chapter = { id: string; label: string };
export default function PlaybookReader({ chapters, sections }: { chapters: Chapter[]; sections: {id:string;html:string}[] }) {
 const [active, setActive] = useState("cover"); const [open, setOpen] = useState(true); const navRef = useRef<HTMLElement>(null);
 useEffect(() => {
  const media = window.matchMedia("(max-width:760px)"); const resize = () => setOpen(!media.matches); resize(); media.addEventListener("change", resize);
  let frame = 0;
  const update = () => { frame = 0; const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 100; document.documentElement.style.setProperty("--reader-header-height", `${headerHeight}px`); const line = headerHeight + (media.matches ? 150 : 48); let current = chapters[0].id; for(const chapter of chapters) { const node = document.getElementById(chapter.id); if(node && node.getBoundingClientRect().top <= line) current = chapter.id; } setActive(current); };
  const scroll = () => { if(!frame) frame = requestAnimationFrame(update); }; update(); window.addEventListener("scroll", scroll, {passive:true}); window.addEventListener("resize", scroll);
  return () => { media.removeEventListener("change", resize); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); cancelAnimationFrame(frame); };
 }, [chapters]);
 useEffect(() => { const nav = navRef.current; const link = nav?.querySelector<HTMLElement>('[aria-current="location"]'); if(nav && link) { const top = link.offsetTop - nav.offsetTop; if(top < nav.scrollTop || top + link.offsetHeight > nav.scrollTop + nav.clientHeight) nav.scrollTop = Math.max(0,top - nav.clientHeight/3); } }, [active]);
 // Reapply deep links after hydration and font layout settle; native fragment
 // navigation can run before the reader has its final header and text sizes.
 useEffect(() => {
  let cancelled = false;
  let frame = 0;
  const navigateToHash = async () => {
   let id: string;
   try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
   if (!chapters.some(chapter => chapter.id === id)) return;
   await document.fonts.ready;
   if (cancelled) return;
   frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(() => {
     if (cancelled) return;
     const target = document.getElementById(id);
     if (!target) return;
     target.scrollIntoView({ behavior: "instant", block: "start" });
     setActive(id);
    });
   });
  };
  void navigateToHash();
  window.addEventListener("hashchange", navigateToHash);
  return () => { cancelled = true; cancelAnimationFrame(frame); window.removeEventListener("hashchange", navigateToHash); };
 }, [chapters]);
 const [query, setQuery] = useState("");
 const [copied, setCopied] = useState("");
 const [manualLink, setManualLink] = useState("");
 const searchable = useMemo(() => sections.map(section => ({ id: section.id, text: section.html.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&").toLowerCase() })), [sections]);
 const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 const results = chapters.filter(chapter => words.every(word => `${chapter.label.toLowerCase()} ${searchable.find(section => section.id === chapter.id)?.text || ""}`.includes(word)));
 const copyLink = async (id: string) => {
  const url = new URL(window.location.href); url.hash = id; url.search = "";
  try { await navigator.clipboard.writeText(url.href); setCopied(id); setManualLink(""); }
  catch { setCopied(""); setManualLink(url.href); }
 };
 const recommendations = chapters.filter(c => /^rec-\d+$/.test(c.id));
 return <div className="playbook-reader">
  <aside className="playbook-contents"><button className="contents-toggle" type="button" aria-expanded={open} aria-controls="reader-navigation" onClick={() => setOpen(!open)}><span>Contents<span className="reader-current">{chapters.find(chapter => chapter.id === active)?.label}</span></span> <span aria-hidden="true">{open ? '−' : '+'}</span></button>
   <div id="reader-navigation" hidden={!open}>
    <label className="reader-search">Search the Playbook<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search recommendations and text" /></label>
    {query.trim() && <p className="reader-search-count" role="status">{results.length} {results.length === 1 ? "section" : "sections"} found</p>}
   <nav id="playbook-chapter-nav" ref={navRef} aria-label="Playbook chapters" hidden={!open}>{results.map(chapter => <a className={/^rec-\d+$/.test(chapter.id)?"contents-recommendation":undefined} key={chapter.id} href={`#${chapter.id}`} aria-current={active === chapter.id ? "location" : undefined} onClick={() => { setActive(chapter.id); if(window.matchMedia("(max-width:760px)").matches) setOpen(false); }}>{chapter.label}</a>)}</nav>{results.length === 0 && <p className="reader-search-empty">Try another word or phrase.</p>}</div>
   <a className="playbook-download" href="/assets/mdc-playbook.pdf" download>Download the full PDF</a>
  </aside>
  <p className="sr-only" role="status">{copied ? "Recommendation link copied to clipboard." : ""}</p><article className="playbook-document">{sections.map(section => { const index = recommendations.findIndex(c => c.id === section.id); return <div className="reader-chapter" key={section.id}>{index >= 0 && <div className="reader-share"><button type="button" onClick={() => copyLink(section.id)} aria-label={`Copy link to recommendation ${index+1}`}>{copied === section.id ? "Link copied" : "Copy link"}</button>{manualLink.endsWith(`#${section.id}`) && <label>Copy this link<input readOnly value={manualLink} onFocus={event => event.currentTarget.select()} /></label>}</div>}<div dangerouslySetInnerHTML={{__html:section.html}} />{index >= 0 && <nav className="recommendation-pagination" aria-label={`Navigation for recommendation ${index+1}`}>{index > 0 ? <a href={`#${recommendations[index-1].id}`}><span>Previous recommendation</span>{recommendations[index-1].label}</a> : <a href="#executive-summary"><span>Previous section</span>Executive Summary</a>}{index < recommendations.length-1 ? <a href={`#${recommendations[index+1].id}`}><span>Next recommendation</span>{recommendations[index+1].label}</a> : <a href="#conclusion"><span>Next section</span>Conclusion</a>}</nav>}</div>; })}</article>
 </div>;
}
