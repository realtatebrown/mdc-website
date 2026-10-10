"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
const links=[{label:'Research',href:'/data'},{label:'Partners',href:'/partners'},{label:'News',href:'/news'}];
const aboutLinks=[{label:'Mission',href:'/#mission'},{label:'Priorities',href:'/#priorities'},{label:'Principles',href:'/principles'}];
export default function SiteHeader() {
 const pathname=usePathname(); const [open,setOpen]=useState(false); const [about,setAbout]=useState(false);
 const header=useRef<HTMLElement>(null);
 const toggle=useRef<HTMLButtonElement>(null); const aboutToggle=useRef<HTMLButtonElement>(null); const aboutMenu=useRef<HTMLDivElement>(null);
 const closeAll=()=>{setOpen(false);setAbout(false);};
 useEffect(()=>{setOpen(false);setAbout(false);},[pathname]);
 useEffect(()=>{
  const close=(event:KeyboardEvent)=>{if(event.key==='Escape'){if(about){setAbout(false);aboutToggle.current?.focus();}else if(open){setOpen(false);toggle.current?.focus();}}};
  const outside=(event:PointerEvent)=>{if(!aboutMenu.current?.contains(event.target as Node))setAbout(false);if(!header.current?.contains(event.target as Node))setOpen(false);};
  document.addEventListener('keydown',close);document.addEventListener('pointerdown',outside);
  return()=>{document.removeEventListener('keydown',close);document.removeEventListener('pointerdown',outside);};
 },[open,about]);
 return <><a className="skip-link" href="#main-content" onClick={closeAll}>Skip to content</a><header ref={header} className="site-header refined-header" onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))closeAll();}}>
  <a className="wordmark" href="/" aria-label="Mass Deportation Coalition home"><img className="coalition-logo" src="/assets/mdc-map-logo-transparent.png" alt=""/></a>


  <button ref={toggle} className="mobile-menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={()=>{setOpen(!open);setAbout(false);}}>{open?'Close':'Menu'}</button>
  <nav id="primary-navigation" className={open?'is-open':''} aria-label="Primary navigation">
   <div className="header-about" ref={aboutMenu} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setAbout(false);}}>
    <button ref={aboutToggle} className="header-about-toggle" type="button" aria-expanded={about} aria-controls="about-navigation" onClick={()=>setAbout(!about)}>About <span aria-hidden="true">{about?'−':'+'}</span></button>
    <div id="about-navigation" className="header-about-links" hidden={!about}>{aboutLinks.map(link=><a key={link.href} href={link.href} onClick={closeAll}>{link.label}</a>)}</div>
   </div>
   {links.map(link=><a key={link.href} href={link.href} aria-current={pathname===link.href?'page':undefined} onClick={closeAll}>{link.label}</a>)}
  </nav>
  <a className="header-action" href="/playbook" aria-current={pathname==='/playbook'?'page':undefined}>Read the Playbook</a>
 </header><div id="main-content" tabIndex={-1} className="content-start" /></>;
}
