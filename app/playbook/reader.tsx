"use client";
import { useEffect, useRef, useState } from "react";
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
 const recommendations = chapters.filter(c => /^rec-\d+$/.test(c.id));
 return <div className="playbook-reader">
  <aside className="playbook-contents"><button className="contents-toggle" type="button" aria-expanded={open} aria-controls="playbook-chapter-nav" onClick={() => setOpen(!open)}>Contents <span aria-hidden="true">{open ? '−' : '+'}</span></button>
   <nav id="playbook-chapter-nav" ref={navRef} aria-label="Playbook chapters" hidden={!open}>{chapters.map(chapter => <a className={/^rec-\d+$/.test(chapter.id)?"contents-recommendation":undefined} key={chapter.id} href={`#${chapter.id}`} aria-current={active === chapter.id ? "location" : undefined} onClick={() => { setActive(chapter.id); if(window.matchMedia("(max-width:760px)").matches) setOpen(false); }}>{chapter.label}</a>)}</nav>
   <a className="playbook-download" href="/assets/mdc-playbook.pdf" download>Download the full PDF</a>
  </aside>
  <article className="playbook-document">{sections.map(section => { const index = recommendations.findIndex(c => c.id === section.id); return <div className="reader-chapter" key={section.id}><div dangerouslySetInnerHTML={{__html:section.html}} />{index >= 0 && <nav className="recommendation-pagination" aria-label={`Navigation for recommendation ${index+1}`}>{index > 0 ? <a href={`#${recommendations[index-1].id}`}><span>Previous recommendation</span>{recommendations[index-1].label}</a> : <a href="#executive-summary"><span>Previous section</span>Executive Summary</a>}{index < recommendations.length-1 ? <a href={`#${recommendations[index+1].id}`}><span>Next recommendation</span>{recommendations[index+1].label}</a> : <a href="#conclusion"><span>Next section</span>Conclusion</a>}</nav>}</div>; })}</article>
 </div>;
}
