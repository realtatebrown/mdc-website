"use client";
import { useEffect, useRef, useState } from 'react';
const views = [{ id: 'cards', label: 'Cards' }, { id: 'map', label: 'Map' }, { id: 'graph', label: 'Network' }];
const base = 'https://datarepublican.com/migration-explorer/network/';
export default function Explorer() {
  const [view, setView] = useState('cards');
  const [org, setOrg] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const shell = useRef<HTMLDivElement>(null);
  const expandButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('view');
    setOrg(params.get('org') || '');
    if (views.some(v => v.id === requested)) setView(requested!);
  }, []);
  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') { setExpanded(false); expandButton.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', close); };
  }, [expanded]);
  const url = `${base}?v=${view}${org ? `&org=${encodeURIComponent(org)}` : ''}#mx-net`;
  return <div ref={shell} className={`explorer-shell${expanded ? ' explorer-expanded' : ''}`}>
    <div className="explorer-toolbar">
      <span className="explorer-toolbar-title">Migration Explorer <span>by DataRepublican</span></span>
      <div className="explorer-window-controls"><button ref={expandButton} type="button" aria-pressed={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Exit expanded view' : 'Expand tool'}</button><a href={url} target="_blank" rel="noopener noreferrer">View Full Website</a></div>
    </div>
    {!loaded && <p className="explorer-loading" role="status">Loading DataRepublican’s explorer…</p>}
    <iframe key={`${view}:${org}`} title="DataRepublican Migration Explorer — organizations, funding, and connections" src={url} onLoad={() => setLoaded(true)} allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
    <div className="explorer-bottom"><span>Explorer provided by DataRepublican</span><a href={url} target="_blank" rel="noopener noreferrer">Having trouble? Open in a new tab</a></div>
  </div>;
}
