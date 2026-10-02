"use client";
import { useState } from "react";
import { officialLogoUrl } from "../official-logos";
import { partnerLinks } from "../partner-links";
type StateGroup = readonly [string, readonly string[]];
export function filterPartners(states: readonly StateGroup[], individuals: readonly string[][], query: string, state: string, kind: string) {
 const term = query.trim().toLocaleLowerCase();
 const groups = kind === "individuals" ? [] : states.filter(([name]) => !state || name === state).map(([name, partners]) => [name, partners.filter(partner => `${partner} ${name}`.toLocaleLowerCase().includes(term))] as const).filter(([, partners]) => partners.length);
 const people = kind === "organizations" || state ? [] : individuals.filter(([name, role]) => `${name} ${role}`.toLocaleLowerCase().includes(term));
 return { groups, people, count: groups.reduce((n, [, partners]) => n + partners.length, 0) + people.length };
}
export default function PartnerDirectory({ states, individuals }: { states: readonly StateGroup[]; individuals: string[][] }) {
 const [query, setQuery] = useState(""); const [state, setState] = useState(""); const [kind, setKind] = useState("all");
 const { groups, people, count } = filterPartners(states, individuals, query, state, kind);
 const filtered = !!query || !!state || kind !== "all";
 const reset = () => { setQuery(""); setState(""); setKind("all"); };
 return <section className="directory-browser section" aria-label="Search coalition partners">
  <div className="directory-filters">
   <label>Search partners<input type="search" placeholder="Name, organization, or role" value={query} onChange={e => setQuery(e.target.value)} /></label>
   <label>State<select value={state} disabled={kind === "individuals"} onChange={e => setState(e.target.value)}><option value="">All states & DC</option>{[...states].sort((a,b) => a[0].localeCompare(b[0])).map(([name]) => <option key={name}>{name}</option>)}</select></label>
   <label>Partner type<select value={kind} onChange={e => { setKind(e.target.value); if(e.target.value === "individuals") setState(""); }}><option value="all">All partners</option><option value="organizations">Organizations</option><option value="individuals">Individuals</option></select></label>
  </div>
  <div className="directory-results-bar"><p role="status" aria-live="polite">{count} {count === 1 ? "partner" : "partners"}{filtered ? " found" : " in the directory"}</p>{filtered && <button type="button" onClick={reset}>Clear filters</button>}</div>
  {groups.length > 0 && <div className="directory-results"><h2>Organizations</h2><div className="state-directory-grid">{groups.map(([name, partners]) => <article key={name} className={partners.length > 8 ? "state-card state-card-wide" : "state-card"}><div className="state-card-heading"><h3>{name}</h3><b>{partners.length}</b></div><div className="partner-logo-grid">{partners.map(partner => { const logo = officialLogoUrl(partner); const body = <><div className="partner-logo-frame">{logo ? <img src={logo} alt="" loading="lazy" /> : <span aria-hidden="true">★</span>}</div><p>{partner}</p></>;return partnerLinks[partner] ? <a key={partner} className="partner-logo-tile" href={partnerLinks[partner]} target="_blank" rel="noopener noreferrer">{body}</a> : <div key={partner} className="partner-logo-tile">{body}</div>; })}</div></article>)}</div></div>}
  {people.length > 0 && <div className="directory-results directory-individual-results"><h2>Individuals</h2><div className="individual-list directory-people-list">{people.map(([name, role, image]) => <article key={name}><img src={`/assets/partners/${image}`} alt="" loading="lazy" /><div><h3>{name}</h3><p>{role}</p></div></article>)}</div></div>}
  {!count && <div className="directory-empty"><h2>No matching partners</h2><p>Try another name or clear the filters to see the full directory.</p><button className="button" type="button" onClick={reset}>Show all partners</button></div>}
 </section>;
}
