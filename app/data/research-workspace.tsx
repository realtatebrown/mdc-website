"use client";
import {useEffect, useState, type MouseEvent} from 'react';
import DataPartnership, {StrongBordersPartnership} from '../data-partnership';
import Explorer from './explorer';
export type ResearchTool = 'migration' | '287g';
const tools = [
 {id:'migration',name:'Migration Explorer',partner:'DataRepublican',description:'Organizations, funding records, and connections.',image:'/assets/explorer-real-preview.jpg'},
 {id:'287g',name:'Texas 287(g) Tracker',partner:'Strong Borders',description:'County and city participation in ICE agreements.',image:'/assets/strong-borders-tracker-preview.jpg'},
] as const;
export default function ResearchWorkspace({initialTool='migration'}:{initialTool?:ResearchTool}) {
 const [selected,setSelected]=useState<ResearchTool>(initialTool);
 useEffect(()=>{const sync=()=>setSelected(new URLSearchParams(window.location.search).get('tool')==='287g'?'287g':'migration');window.addEventListener('popstate',sync);return()=>window.removeEventListener('popstate',sync);},[]);
 function choose(event:MouseEvent<HTMLAnchorElement>,tool:ResearchTool){
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();if(selected===tool)return;
  const url=new URL(window.location.href);url.searchParams.set('tool',tool);url.hash='';window.history.pushState(null,'',url);setSelected(tool);
 }
 return <>
  <nav className="research-selectors" aria-label="Choose a research tool">{tools.map(tool=><a key={tool.id} className={`research-selector${selected===tool.id?' is-active':''}`} href={`/data?tool=${tool.id}`} aria-current={selected===tool.id?'true':undefined} onClick={e=>choose(e,tool.id)}>
   <div className={`research-selector-image research-selector-image-${tool.id}`}><img src={tool.image} alt="" width="400" height="260" /></div>
   <div className="research-selector-copy"><span>{tool.partner}</span><h2>{tool.name}</h2><p>{tool.description}</p><small>{selected===tool.id?'Viewing this tool':'View tool'} <span aria-hidden="true">{selected===tool.id?'↓':'→'}</span></small></div>
  </a>)}</nav>
  <section key={selected} className="research-active-panel" aria-labelledby="research-tool-title">
   <div className="research-tool-intro">{selected==='migration'?<DataPartnership compact/>:<StrongBordersPartnership/>}<div className="research-tool-heading"><div><h2 id="research-tool-title">{selected==='migration'?'Migration Explorer':'Texas 287(g) Tracker'}</h2><p>{selected==='migration'?'Look up an organization to see its funding records and links to other groups.':'See which Texas law enforcement agencies participate in ICE’s 287(g) program and which agreement models they use.'}</p></div><span className="research-scope">{selected==='migration'?'Organizations & funding':'Texas · Counties & cities'}</span></div></div>
   {selected==='migration'?<><Explorer/><details className="data-research-note"><summary>About the data and sources</summary><p>DataRepublican maintains this explorer using public federal records and IRS filings. Each organization’s profile links to its sources. Check those records for details and possible errors.</p><p>A listing shows a funding record, grant, or affiliation; it is not an allegation of wrongdoing. Dollar amounts are documented minimums. Do not add different funding types together. Foreign-born population totals include naturalized citizens and people of all legal statuses.</p><a href="https://datarepublican.com/migration-explorer/network/" target="_blank" rel="noopener noreferrer">View Full Website</a></details></>:<div className="tracker-preview-panel">
    <figure><a href="https://287g.strongborders.org/" target="_blank" rel="noopener noreferrer" aria-label="Open the live Texas 287(g) tracker on Strong Borders (new tab)"><img src="/assets/strong-borders-tracker-preview.jpg" alt="Strong Borders’ Texas map, with counties colored by 287(g) agreement model and participation status" width="1363" height="936" /></a><figcaption>Map preview · Strong Borders · October 12, 2026. Open the live tracker for current participation.</figcaption></figure>
    <div className="tracker-preview-copy"><span className="section-index">Explore Texas</span><h3>Start with your county.</h3><p>Select a county on the live map to see its participation and the cities within it.</p><ul><li>County participation</li><li>City agreements</li><li>Agreement models</li></ul><a className="button" href="https://287g.strongborders.org/" target="_blank" rel="noopener noreferrer">Open live tracker <span aria-hidden="true">↗</span></a><p className="tracker-external-note">Opens on Strong Borders in a new tab.</p><a className="tracker-full-site" href="https://strongborders.org/287g/" target="_blank" rel="noopener noreferrer">View Full Website ↗</a></div>
   </div>}
  </section>
 </>;
}
