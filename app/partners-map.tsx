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
      const stateFips: Record<string, string> = { AZ:"04", DC:"11", FL:"12", GA:"13", ID:"16", IL:"17", IN:"18", LA:"22", MD:"24", MI:"26", MO:"29", MT:"30", NY:"36", NC:"37", OH:"39", OK:"40", PA:"42", SD:"46", TN:"47", TX:"48", UT:"49", VA:"51", WI:"55", WY:"56" };
      const activeStates = new Set(locations.map((location) => stateFips[location.state]));
      const offsets: Record<string, [number, number]> = {
        "Washington, DC": [82, -58],
        "Fairfax, VA": [-82, 44],
        "Fredericksburg, VA": [-52, 82],
        "Richmond, VA": [30, 90],
        "Annapolis, MD": [94, 16],
        "New York, NY": [62, -32],
        "Dallas–Fort Worth, TX": [-34, -48],
        "North Texas, TX": [50, -32],
        "Round Rock, TX": [-58, 24],
        "Spring, TX": [52, 36],
      };
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
        const key = `${location.city}, ${location.state}`;
        const offset = offsets[key] || [0, 0];
        const markerPoint: [number, number] = [point[0] + offset[0], point[1] + offset[1]];
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("class", "map-pin");
        group.setAttribute("role", "button");
        group.setAttribute("aria-label", `${location.city}, ${location.state}: ${location.partners.join(", ")}`);
        group.setAttribute("transform", `translate(${markerPoint[0]},${markerPoint[1]})`);
        if (offset[0] || offset[1]) {
          const leader = document.createElementNS("http://www.w3.org/2000/svg", "line");
          leader.setAttribute("x1", String(-offset[0]));
          leader.setAttribute("y1", String(-offset[1]));
          leader.setAttribute("x2", "0");
          leader.setAttribute("y2", "0");
          leader.setAttribute("class", "map-leader");
          group.appendChild(leader);
        }
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", location.partners.length > 4 ? "19" : "15");
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("dy", ".35em");
        label.textContent = String(location.partners.length);
        group.append(circle, label);
        if (offset[0] || offset[1] || location.partners.length > 3) {
          const place = document.createElementNS("http://www.w3.org/2000/svg", "text");
          place.setAttribute("class", "map-place-label");
          place.setAttribute("text-anchor", offset[0] < 0 ? "end" : "start");
          place.setAttribute("x", offset[0] < 0 ? "-24" : "24");
          place.setAttribute("y", "4");
          place.textContent = location.state === "DC" ? "WASHINGTON, DC" : location.city.toUpperCase();
          group.appendChild(place);
        }
        group.addEventListener("click", () => setActive(location));
        group.addEventListener("mouseenter", () => setActive(location));
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
