"use client";

import { useEffect, useRef, useState } from "react";

export type PartnerLocation = { city: string; state: string; lat: number; lon: number; partners: string[] };

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
      svg.replaceChildren();

      const mapGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      for (const feature of states.features) {
        const state = document.createElementNS("http://www.w3.org/2000/svg", "path");
        state.setAttribute("d", path(feature) || "");
        state.setAttribute("class", "state-shape");
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
        group.addEventListener("click", () => setActive(location));
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
      {active ? <><strong>{active.city}, {active.state}</strong><span>{active.partners.join(" · ")}</span></> : <><strong>Select a numbered marker</strong><span>Each marker shows the number of coalition organizations at that location.</span></>}
    </div>
  </div>;
}
