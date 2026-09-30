"use client";

import { useEffect, useState } from "react";
import { officialLogoUrl } from "./official-logos";
import { partnerLinks } from "./partner-links";

export type PartnerLocation = { city:string; state:string; lat:number; lon:number; partners:string[] };
type MapPoint = { location:PartnerLocation; x:number; y:number };
type MapShape = { id:string; state:string|null; d:string; active:boolean };

const stateNames:Record<string,string>={AZ:"Arizona",DC:"District of Columbia",FL:"Florida",GA:"Georgia",ID:"Idaho",IL:"Illinois",IN:"Indiana",LA:"Louisiana",MD:"Maryland",MI:"Michigan",MO:"Missouri",MT:"Montana",NY:"New York",NC:"North Carolina",OH:"Ohio",OK:"Oklahoma",PA:"Pennsylvania",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VA:"Virginia",WI:"Wisconsin",WY:"Wyoming"};

export default function PartnersMap({ locations }:{ locations:PartnerLocation[] }) {
  const [shapes,setShapes] = useState<MapShape[]>([]);
  const [points,setPoints] = useState<MapPoint[]>([]);
  const [active,setActive] = useState<MapPoint|null>(null);
  const [failed,setFailed] = useState(false);
  useEffect(() => {
    let cancelled=false;
    async function loadMap(){
      const dynamicImport=new Function("url","return import(url)") as (url:string)=>Promise<any>;
      const [d3,topojson,atlas]=await Promise.all([
        dynamicImport("https://cdn.jsdelivr.net/npm/d3-geo@3/+esm"),
        dynamicImport("https://cdn.jsdelivr.net/npm/topojson-client@3/+esm"),
        fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(r=>r.json()),
      ]);
      if(cancelled)return;
      const width=960,height=600;
      const featureCollection=topojson.feature(atlas,atlas.objects.states);
      const projection=d3.geoAlbersUsa().fitExtent([[24,24],[width-24,height-24]],featureCollection);
      const path=d3.geoPath(projection);
      const fips:Record<string,string>={AZ:"04",DC:"11",FL:"12",GA:"13",ID:"16",IL:"17",IN:"18",LA:"22",MD:"24",MI:"26",MO:"29",MT:"30",NY:"36",NC:"37",OH:"39",OK:"40",PA:"42",SD:"46",TN:"47",TX:"48",UT:"49",VA:"51",WI:"55",WY:"56"};
      const represented=new Set(locations.map(l=>fips[l.state]));
      const stateByFips=Object.fromEntries(Object.entries(fips).map(([state,id])=>[id,state]));
      setShapes(featureCollection.features.map((feature:any)=>{const id=String(feature.id).padStart(2,"0");return{id,d:path(feature)||"",state:stateByFips[id]||null,active:represented.has(id)}}));
      const byState=new Map<string,string[]>();
      locations.forEach(location=>byState.set(location.state,[...(byState.get(location.state)||[]),...location.partners]));
      const featureByFips=new Map(featureCollection.features.map((feature:any)=>[String(feature.id).padStart(2,"0"),feature]));
      setPoints([...byState.entries()].flatMap(([state,partners])=>{
        const feature=featureByFips.get(fips[state]);
        if(!feature)return[];
        const p=path.centroid(feature as any);
        return Number.isFinite(p[0])&&Number.isFinite(p[1])?[{location:{city:"",state,lat:0,lon:0,partners},x:p[0],y:p[1]}]:[];
      }));
    }
    loadMap().catch(()=>setFailed(true));
    return()=>{cancelled=true};
  },[locations]);

  const activateState=(state:string)=>setActive(points.find(point=>point.location.state===state)||null);
  const combined=active&&["MD","DC"].includes(active.location.state);
  const selected=active?(combined?locations.filter(point=>["MD","DC"].includes(point.state)):locations.filter(point=>point.state===active.location.state)):[];
  const title=combined?"Maryland & Washington, DC":active?stateNames[active.location.state]:"";
  return <div className="map-shell responsive-partner-map">
    <div className="map-controls"><label htmlFor="partner-state">Explore partners by state</label><select id="partner-state" value={active?.location.state||""} onChange={e=>{const state=e.target.value;setActive(points.find(p=>p.location.state===state)|| (state?{location:locations.find(p=>p.state===state)!,x:0,y:0}:null));}}><option value="">Select a state</option>{locations.filter(p=>p.state!=="DC").map(p=><option key={p.state} value={p.state}>{p.state==="MD"?"Maryland & Washington, DC":stateNames[p.state]}</option>)}</select></div>
    <div className="map-stage">
      <svg className="usa-map" viewBox="0 0 960 600" role="group" aria-label="Coalition partners by state">
        {shapes.map(shape=><path key={shape.id} d={shape.d} className={`state-shape ${shape.active?"state-has-partner":""}`} role={shape.active?"button":undefined} tabIndex={shape.active?0:undefined} aria-label={shape.active?`Show ${stateNames[shape.state!]} partners`:undefined} onMouseEnter={()=>{if(shape.active&&window.matchMedia("(hover: hover) and (min-width: 761px)").matches)activateState(shape.state!);}} onClick={()=>shape.active&&activateState(shape.state!)} onKeyDown={e=>{if(shape.active&&(e.key==="Enter"||e.key===" ")){e.preventDefault();activateState(shape.state!);}}}/>)}
        {points.filter(point=>point.location.state!=="DC").map(point=>{const dc=point.location.state==="MD"?locations.find(p=>p.state==="DC"):null;return <g className="state-count-badge" key={point.location.state} transform={`translate(${point.x},${point.y})`} aria-hidden="true"><rect x="-18" y="-14" width="36" height="28" rx="14"/><text textAnchor="middle" dy=".35em">{point.location.partners.length+(dc?.partners.length||0)}</text></g>})}
      </svg>
      {!shapes.length&&<p className="map-loading">{failed?"Map unavailable. Use the state selector above.":"Loading partner map…"}</p>}
      {active&&<aside className="map-partner-panel" aria-label={`${title} partners`} onKeyDown={e=>{if(e.key==="Escape")setActive(null);}}>
        <div className="map-panel-heading"><h3>{title}</h3><button type="button" onClick={()=>setActive(null)} aria-label="Close partner panel">×</button></div>
        <div className={`map-panel-links ${active.location.state==="TX"?"map-panel-texas":""}`}>
          {selected.flatMap(p=>p.partners).map(partner=>{const logo=officialLogoUrl(partner);const content=<><span className="hover-logo">{logo?<img src={logo} alt="" onError={e=>{e.currentTarget.style.display="none"}}/>:<b>★</b>}</span><span>{partner}</span></>;return partnerLinks[partner]?<a className="hover-partner" key={partner} href={partnerLinks[partner]} target="_blank" rel="noreferrer">{content}</a>:<div className="hover-partner" key={partner}>{content}</div>;})}
        </div>
      </aside>}
    </div>
  </div>;
}
