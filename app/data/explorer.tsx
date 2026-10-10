"use client";
import { useEffect, useRef, useState } from 'react';
const views = [{ id: 'cards', label: 'Cards' }, { id: 'map', label: 'Map' }, { id: 'graph', label: 'Network' }];
const base = 'https://datarepublican.com/migration-explorer/network/';
export default function Explorer() {
  const [view, setView] = useState('cards');
  const [org, setOrg] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [slow, setSlow] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const shell = useRef<HTMLDivElement>(null);
  const expandButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sync = () => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('view');
    setOrg(params.get('org') || '');
    setView(views.some(v => v.id === requested) ? requested! : 'cards');
    };
    sync(); window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const background: {element: HTMLElement; inert: boolean}[] = [];
    let node: HTMLElement | null = shell.current;
    while(node && node !== document.body) {
      for(const sibling of Array.from(node.parentElement?.children || [])) {
        if(sibling !== node && sibling instanceof HTMLElement) {background.push({element:sibling,inert:sibling.inert});sibling.inert=true;}
      }
      node=node.parentElement;
    }
    expandButton.current?.focus({preventScroll:true});
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') { setExpanded(false); expandButton.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => { document.body.style.overflow = previous; background.forEach(({element,inert})=>{element.inert=inert;}); document.removeEventListener('keydown', close); };
  }, [expanded]);
  const url = `${base}?v=${view}${org ? `&org=${encodeURIComponent(org)}` : ''}#mx-net`;
  useEffect(() => {
    setLoaded(false); setSlow(false);
    const timer = window.setTimeout(() => setSlow(true), 12000);
    return () => window.clearTimeout(timer);
  }, [url, attempt]);
  return <div ref={shell} role={expanded ? "dialog" : "region"} aria-modal={expanded ? true : undefined} aria-label="Migration Explorer" className={`explorer-shell${expanded ? ' explorer-expanded' : ''}`}>
    {expanded && <span tabIndex={0} className="sr-only" onFocus={()=>shell.current?.querySelector<HTMLAnchorElement>(".explorer-bottom a")?.focus()} />}
    <div className="explorer-toolbar">
      <span className="explorer-toolbar-title">Migration Explorer <span>by DataRepublican</span></span>
      <div className="explorer-window-controls"><button ref={expandButton} type="button" aria-pressed={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Exit expanded view' : 'Expand tool'}</button><a className="explorer-full-site" href={url} target="_blank" rel="noopener noreferrer">View Full Website</a></div>
    </div>
    <div className="explorer-start"><p>Start with Cards to look up an organization. Use Map for locations or Network for connections.</p><div className="explorer-views" aria-label="Explorer views">{views.map(option => <button key={option.id} type="button" aria-pressed={view === option.id} onClick={() => { if (view === option.id) return; setLoaded(false); setSlow(false); setView(option.id); const page = new URL(window.location.href); page.searchParams.set('view', option.id); window.history.replaceState(null, '', page); }}>{option.label}</button>)}</div></div>
    {!loaded && <div className="explorer-load-notice" role="status">{slow ? <><p>The explorer is taking longer than expected. You can retry or open it directly on DataRepublican’s website.</p><button type="button" onClick={() => setAttempt(value => value + 1)}>Retry</button><a href={url} target="_blank" rel="noopener noreferrer">View Full Website</a></> : <p>Loading DataRepublican’s explorer…</p>}</div>}
    <iframe key={`${view}:${org}:${attempt}`} title="DataRepublican Migration Explorer — organizations, funding, and connections" src={url} onLoad={() => setLoaded(true)} onError={() => {setLoaded(false);setSlow(true);}} allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
    <div className="explorer-bottom"><span>Explorer provided by DataRepublican</span><a href={url} target="_blank" rel="noopener noreferrer">Blank or unresponsive? View Full Website</a></div>
    {expanded && <span tabIndex={0} className="sr-only" onFocus={()=>expandButton.current?.focus()} />}
  </div>;
}
