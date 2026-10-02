"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
const links=[{label:'Mission',href:'/#mission'},{label:'Priorities',href:'/#priorities'},{label:'Principles',href:'/principles'},{label:'Playbook',href:'/playbook'},{label:'Partners',href:'/partners'},{label:'News',href:'/news'}];
export default function SiteHeader() {
 const pathname=usePathname(); const [open,setOpen]=useState(false); const toggle=useRef<HTMLButtonElement>(null);
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{const close=(event:KeyboardEvent)=>{if(event.key==='Escape' && open){setOpen(false);toggle.current?.focus();}};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close);},[open]);
 return <header className="site-header refined-header">
  <a className="wordmark" href="/" aria-label="Mass Deportation Coalition home"><img className="coalition-logo" src="/assets/mdc-map-logo-transparent.png" alt=""/></a>
  <nav id="primary-navigation" className={open?'is-open':''} aria-label="Primary navigation">{links.map(link=><a key={link.href} href={link.href} aria-current={pathname===link.href?'page':undefined} onClick={()=>setOpen(false)}>{link.label}</a>)}</nav>
  <a className="header-action" href="/playbook">Read the Playbook</a>
  <button ref={toggle} className="mobile-menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}</button>
 </header>;
}
