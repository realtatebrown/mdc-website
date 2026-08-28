"use client";

import { useEffect, useRef, useState } from "react";

export type PartnerLocation = { city:string; state:string; lat:number; lon:number; partners:string[] };
type MapPoint = { location:PartnerLocation; x:number; y:number };
type MapShape = { id:string; d:string; active:boolean };

const domains:Record<string,string> = {
  "American Moment":"americanmoment.org", "Center for the American Way of Life":"dc.claremont.org",
  "Federation for American Immigration Reform":"fairus.org", "The Heritage Foundation":"heritage.org",
  "Immigration Accountability Project":"iaproject.org", "National Immigration Center for Enforcement":"immigrationcenterforenforcement.org",
  "New Guard Press":"newguardpress.com", "Oversight Project":"itsyourgov.org", "State Leadership Initiative":"stateleadership.org",
  "Citizens for a New Louisiana":"newlouisiana.org", "The Conservative Caucus":"theconservativecaucus.com",
  "Fredericksburg Tea Party":"fredericksburgteaparty.org", "Eagle Forum of Georgia":"eagleforumofgeorgia.org",
  "Tea Party Patriots Action":"teapartypatriots.org", "Illinois Freedom Caucus":"illinoisfreedomcaucus.org",
  "Maryland Freedom Caucus":"mdfreedom.org", "Muckraker":"muckraker.com",
  "North Carolina Physicians for Freedom":"ncphysiciansforfreedom.com", "Ohio College Republican Federation":"ohiocr.com",
  "Pennsylvania Federation of College Republicans":"pafcr.org", "Save Heritage Indiana":"saveheritageindiana.org",
  "South Dakota Freedom Caucus":"sdfreedomcaucus.com", "Stand Up Michigan":"standupmichigan.com",
  "Tennessee Heritage Association":"tnheritage.org", "Utah Federation of College Republicans":"ufcr.gop",
  "Virginia College Republicans":"vacollegegop.com", "Wisconsin Federation of College Republicans":"wicrs.gop",
  "Capital Area Conservative Republicans":"capitalareaconservativerepublicans.com", "Dallas Eagle Forum":"dallaseagleforum.com",
  "Denton County Conservative Coalition":"dentoncountyconservativecoalition.com", "Irving Republican Women":"irvingrepublicanwomen.com",
  "Grassroots America — We the People":"gawtp.com", "Montgomery County Eagle Forum":"mceagleforum.org",
  "Kerr County Patriots":"kerrcountypatriots.com", "The Remembrance Project":"trp-usa.org",
  "Texas Eagle Forum":"texaseagleforum.com", "Texans for Strong Borders":"strongborders.org",
  "True Texas Project":"truetexasproject.com", "We the People — Liberty in Action":"libertyinactiontexas.com",
  "Young Conservatives of Texas":"yct.org",
};

export default function PartnersMap({ locations }:{ locations:PartnerLocation[] }) {
  const [shapes,setShapes] = useState<MapShape[]>([]);
  const [points,setPoints] = useState<MapPoint[]>([]);
  const [active,setActive] = useState<MapPoint|null>(null);
  const [activeCluster,setActiveCluster] = useState<string|null>(null);
  const closeTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const keepOpen=()=>{if(closeTimer.current){clearTimeout(closeTimer.current);closeTimer.current=null;}};
  const closeLater=()=>{keepOpen();closeTimer.current=setTimeout(()=>{setActive(null);setActiveCluster(null)},850)};

  const clusterFor=(point:MapPoint)=>{
    if(["DC","MD","VA"].includes(point.location.state))return "dmv";
    if(["Dallas–Fort Worth","Palo Pinto","Eastland","North Texas"].includes(point.location.city))return "north-texas";
    if(["Atlanta","Woodstock"].includes(point.location.city))return "atlanta";
    if(["Houston","Spring"].includes(point.location.city))return "houston";
    return null;
  };
  const clusterMembers=activeCluster?points.filter(point=>clusterFor(point)===activeCluster):[];
  const clusterNames=["dmv","north-texas","atlanta","houston"];
  const membersFor=(cluster:string)=>points.filter(point=>clusterFor(point)===cluster);
  const clusterCenter=(members:MapPoint[]):[number,number]=>[
    members.reduce((sum,point)=>sum+point.x,0)/members.length,
    members.reduce((sum,point)=>sum+point.y,0)/members.length,
  ];
  const clusterOffsets:Record<string,[number,number][]>={
    dmv:[[-160,-35],[-80,50],[0,-35],[80,50],[160,-35]],
    "north-texas":[[-150,-20],[-50,45],[50,-20],[150,45]],
    atlanta:[[-68,0],[68,0]],
    houston:[[-68,0],[68,0]],
  };
  const displayedPoint=(point:MapPoint):[number,number]=>{
    const cluster=clusterFor(point);
    if(!cluster||cluster!==activeCluster)return[point.x,point.y];
    const index=clusterMembers.indexOf(point);
    const [rawX,rawY]=clusterCenter(clusterMembers);
    const centerX=Math.max(190,Math.min(740,rawX));
    const centerY=Math.max(205,Math.min(470,rawY));
    const offset=clusterOffsets[cluster]?.[index]||[0,0];
    return[centerX+offset[0],centerY+offset[1]];
  };

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
      setShapes(featureCollection.features.map((feature:any)=>({id:String(feature.id),d:path(feature)||"",active:represented.has(String(feature.id).padStart(2,"0"))})));
      setPoints(locations.flatMap(location=>{const p=projection([location.lon,location.lat]);return p?[{location,x:p[0],y:p[1]}]:[];}));
    }
    loadMap().catch(()=>{});
    return()=>{cancelled=true};
  },[locations]);

  useEffect(()=>()=>keepOpen(),[]);

  return <div className="map-shell" onMouseEnter={keepOpen} onMouseLeave={closeLater}>
    <div className="map-stage">
      <svg className="usa-map" viewBox="0 0 960 600" role="img" aria-label="Map of United States coalition partner locations">
        {shapes.map(shape=><path key={shape.id} d={shape.d} className={shape.active?"state-shape state-has-partner":"state-shape"}/>) }
        {clusterMembers.map(point=>{const [x,y]=displayedPoint(point);return <line key={`line-${point.location.city}`} className="cluster-map-leader" x1={point.x} y1={point.y} x2={x} y2={y}/>})}
        {!activeCluster&&active&&<line className="active-map-leader" x1={active.x} y1={active.y} x2={active.x>620?560:720} y2={110}/>} 
        {points.filter(point=>!clusterFor(point)||clusterFor(point)===activeCluster).map(point=>{const [x,y]=displayedPoint(point);return <g key={`${point.location.city}-${point.location.state}`} className={`map-pin ${activeCluster&&clusterFor(point)===activeCluster?"map-pin-expanded":""}`} transform={`translate(${x},${y})`} onMouseEnter={()=>{setActive(point);setActiveCluster(clusterFor(point))}} onClick={()=>{setActive(point);setActiveCluster(clusterFor(point))}} role="button" aria-label={`${point.location.city}, ${point.location.state}: ${point.location.partners.join(", ")}`}>
          <circle r={point.location.partners.length>4?15:11}/><text textAnchor="middle" dy=".35em">{point.location.partners.length}</text>
        </g>})}
        {clusterNames.filter(cluster=>cluster!==activeCluster).map(cluster=>{const members=membersFor(cluster);if(!members.length)return null;const [x,y]=clusterCenter(members);const count=members.reduce((sum,point)=>sum+point.location.partners.length,0);return <g key={`cluster-${cluster}`} className="map-pin map-cluster-pin" transform={`translate(${x},${y})`} onMouseEnter={()=>{setActive(members[0]);setActiveCluster(cluster)}} onClick={()=>{setActive(members[0]);setActiveCluster(cluster)}} role="button" aria-label={`${count} partners across ${members.length} nearby locations`}>
          <circle r={20}/><text textAnchor="middle" dy=".35em">{count}</text>
        </g>})}
      </svg>
      {!shapes.length&&<p className="map-loading">Loading partner map…</p>}
      {activeCluster&&<div className="cluster-map-callouts" onMouseEnter={keepOpen} onMouseLeave={closeLater}>
        {clusterMembers.map((point,index)=>{const [x,y]=displayedPoint(point);return <section className={`cluster-location-callout ${point.location.partners.length>6?"callout-dense":""}`} key={`${point.location.city}-${point.location.state}`} style={{left:`${x/9.6}%`,top:`${y/6}%`,animationDelay:`${index*45}ms`}}>
          <i className="callout-stem" aria-hidden="true" />
          <h4>{point.location.city}, {point.location.state}</h4>
          {point.location.partners.map(partner=>domains[partner]?<a className="callout-partner" href={`https://${domains[partner]}`} target="_blank" rel="noreferrer" key={partner}>
            <span className="callout-logo"><b>★</b>{domains[partner]&&<img src={`https://${domains[partner]}/favicon.ico`} alt={`${partner} logo`} onError={e=>{e.currentTarget.style.display="none"}}/>}</span><span>{partner}</span>
          </a>:<div className="callout-partner" key={partner}><span className="callout-logo"><b>★</b></span><span>{partner}</span></div>)}
        </section>})}
      </div>}
      {!activeCluster&&active&&<aside className={`partner-hover-card ${active.x>620?"card-left":"card-right"}`}>
        <div className="hover-card-heading"><span>Partner location</span><strong>{active.location.city}, {active.location.state}</strong></div>
        <div className="hover-partner-grid">
          {active.location.partners.map(partner=><div className="hover-partner" key={partner}>
            <span className="hover-logo"><b>★</b>{domains[partner]&&<img src={`https://${domains[partner]}/favicon.ico`} alt={`${partner} logo`} onError={e=>{e.currentTarget.style.display="none"}}/>}</span>
            <span>{partner}</span>
          </div>)}
        </div>
      </aside>}
    </div>
    <div className="map-detail" aria-live="polite">
      {active?<><strong>{active.location.city}, {active.location.state}</strong><span>{active.location.partners.join(" · ")}</span></>:<><strong>Hover over a numbered marker</strong><span>The dot stays on its true location; its partners open in a separate panel.</span></>}
    </div>
  </div>;
}
