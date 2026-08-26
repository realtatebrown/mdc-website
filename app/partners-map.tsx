"use client";

import { useEffect, useRef, useState } from "react";

export type PartnerLocation = { city: string; state: string; lat: number; lon: number; partners: string[] };

const partnerDomains: Record<string, string> = {
  "American Moment":"americanmoment.org", "Center for the American Way of Life":"dc.claremont.org",
  "Federation for American Immigration Reform":"fairus.org", "The Heritage Foundation":"heritage.org",
  "Immigration Accountability Project":"iaproject.org", "National Immigration Center for Enforcement":"immigrationcenterforenforcement.org",
  "New Guard Press":"newguardpress.com", "Oversight Project":"itsyourgov.org", "State Leadership Initiative":"stateleadership.org",
  "Citizens for a New Louisiana":"newlouisiana.org", "The Conservative Caucus":"theconservativecaucus.com",
  "Fredericksburg Tea Party":"fredericksburgteaparty.org", "Eagle Forum of Georgia":"eagleforumofgeorgia.org",
  "Tea Party Patriots Action":"teapartypatriots.org", "Illinois Freedom Caucus":"illinoisfreedomcaucus.org",
  "Maryland Freedom Caucus":"mdfreedom.org", "Montana Freedom Caucus":"montanafreedomcaucus.com",
  "Muckraker":"muckraker.com", "North Carolina Physicians for Freedom":"ncphysiciansforfreedom.com",
  "Ohio College Republican Federation":"ohiocr.com", "Pennsylvania Federation of College Republicans":"pafcr.org",
  "Save Heritage Indiana":"saveheritageindiana.org", "South Dakota Freedom Caucus":"sdfreedomcaucus.com",
  "Stand Up Michigan":"standupmichigan.com", "Tennessee Heritage Association":"tnheritage.org",
  "Utah Federation of College Republicans":"ufcr.gop", "Virginia College Republicans":"vacollegegop.com",
  "Wisconsin Federation of College Republicans":"wicrs.gop", "Capital Area Conservative Republicans":"capitalareaconservativerepublicans.com",
  "Dallas Eagle Forum":"dallaseagleforum.com", "Denton County Conservative Coalition":"dentoncountyconservativecoalition.com",
  "Irving Republican Women":"irvingrepublicanwomen.com", "Grassroots America — We the People":"gawtp.com",
  "Montgomery County Eagle Forum":"mceagleforum.org", "Kerr County Patriots":"kerrcountypatriots.com",
  "Palo Pinto County Conservatives":"palopintocountyconservatives.com", "The Remembrance Project":"trp-usa.org",
  "Texas Eagle Forum":"texaseagleforum.com", "Texans for Strong Borders":"strongborders.org",
  "True Texas Project":"truetexasproject.com", "We the People — Liberty in Action":"libertyinactiontexas.com",
  "Young Conservatives of Texas":"yct.org",
};

export default function PartnersMap({ locations }: { locations: PartnerLocation[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<PartnerLocation | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function draw() {
      const dynamicImport = new Function("url", "return import(url)") as (url: string) => Promise<any>;
      const [d3, topojson, atlas] = await Promise.all([
        dynamicImport("https://cdn.jsdelivr.net/npm/d3-geo@3/+esm"),
        dynamicImport("https://cdn.jsdelivr.net/npm/topojson-client@3/+esm"),
        fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then((r) => r.json()),
      ]);
      if (cancelled || !svgRef.current) return;
      const svg = svgRef.current;
      const width = 960;
      const height = 600;
      const states = topojson.feature(atlas, atlas.objects.states);
      const projection = d3.geoAlbersUsa().fitExtent([[24, 24], [width - 24, height - 24]], states);
      const path = d3.geoPath(projection);
      const stateFips: Record<string, string> = { AZ:"04", DC:"11", FL:"12", GA:"13", ID:"16", IL:"17", IN:"18", LA:"22", MD:"24", MI:"26", MO:"29", MT:"30", NY:"36", NC:"37", OH:"39", OK:"40", PA:"42", SD:"46", TN:"47", TX:"48", UT:"49", VA:"51", WI:"55", WY:"56" };
      const activeStates = new Set(locations.map((location) => stateFips[location.state]));
      svg.replaceChildren();

      const mapGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      for (const feature of states.features) {
        const state = document.createElementNS("http://www.w3.org/2000/svg", "path");
        state.setAttribute("d", path(feature) || "");
        const featureId = String(feature.id).padStart(2, "0");
        state.setAttribute("class", activeStates.has(featureId) ? "state-shape state-has-partner" : "state-shape");
        mapGroup.appendChild(state);
      }
      svg.appendChild(mapGroup);

      for (const location of locations) {
        const point = projection([location.lon, location.lat]);
        if (!point) continue;
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("class", "map-pin");
        group.setAttribute("role", "button");
        group.setAttribute("aria-label", `${location.city}, ${location.state}: ${location.partners.join(", ")}`);
        group.setAttribute("transform", `translate(${point[0]},${point[1]})`);
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", location.partners.length > 4 ? "19" : "15");
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("dy", ".35em");
        label.textContent = String(location.partners.length);
        group.append(circle, label);

        const columns = location.partners.length > 3 ? 2 : 1;
        const rows = Math.ceil(location.partners.length / columns);
        const panelWidth = columns === 2 ? 400 : 300;
        const panelHeight = 58 + rows * 46;
        const panelX = point[0] > 620 ? -panelWidth - 30 : 30;
        const panelY = Math.max(-point[1] + 20, Math.min(-panelHeight / 2, 580 - point[1] - panelHeight));
        const leader = document.createElementNS("http://www.w3.org/2000/svg", "line");
        leader.setAttribute("x1", "0"); leader.setAttribute("y1", "0");
        leader.setAttribute("x2", String(panelX < 0 ? panelX + panelWidth : panelX)); leader.setAttribute("y2", String(panelY + 30));
        leader.setAttribute("class", "map-leader");
        group.appendChild(leader);

        const foreign = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        foreign.setAttribute("x", String(panelX)); foreign.setAttribute("y", String(panelY));
        foreign.setAttribute("width", String(panelWidth)); foreign.setAttribute("height", String(panelHeight));
        foreign.setAttribute("class", "map-breakout-wrap");
        const panel = document.createElement("div");
        panel.setAttribute("class", `map-breakout ${columns === 2 ? "map-breakout-wide" : ""}`);
        const heading = document.createElement("strong");
        heading.textContent = `${location.city}, ${location.state}`;
        panel.appendChild(heading);
        const grid = document.createElement("div"); grid.setAttribute("class", "map-breakout-grid");
        for (const partner of location.partners) {
          const item = document.createElement("div"); item.setAttribute("class", "map-partner-item");
          const mark = document.createElement("span"); mark.setAttribute("class", "map-partner-logo"); mark.textContent = "★";
          const domain = partnerDomains[partner];
          if (domain) {
            const img = document.createElement("img");
            img.alt = ""; img.src = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
            img.addEventListener("load", () => { mark.textContent = ""; mark.appendChild(img); });
          }
          const name = document.createElement("span"); name.textContent = partner;
          item.append(mark, name); grid.appendChild(item);
        }
        panel.appendChild(grid); foreign.appendChild(panel); group.appendChild(foreign);
        group.addEventListener("click", () => setActive(location));
        group.addEventListener("mouseenter", () => { svg.appendChild(group); setActive(location); });
        svg.appendChild(group);
      }
      setReady(true);
    }
    draw().catch(() => setReady(false));
    return () => { cancelled = true; };
  }, [locations]);

  return <div className="map-shell">
    <svg ref={svgRef} className="usa-map" viewBox="0 0 960 600" role="img" aria-label="Map of United States coalition partner locations" />
    {!ready && <p className="map-loading">Loading partner map…</p>}
    <div className="map-detail" aria-live="polite">
      {active ? <><strong>{active.city}, {active.state}</strong><span>{active.partners.join(" · ")}</span></> : <><strong>Hover over a numbered marker</strong><span>Names appear here instantly. Lines separate crowded locations from their exact position.</span></>}
    </div>
  </div>;
}
