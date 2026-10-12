export default function DataPartnership({ compact = false }: { compact?: boolean }) {
  return <div className={`data-partnership${compact ? ' data-partnership-compact' : ''}`} aria-label="DataRepublican in collaboration with Mass Deportation Coalition">
    <div className="data-partner-identity"><img src="/assets/datarepublican-avatar.png" alt="" width="400" height="400" /><span>Data<span className="data-wordmark-light">Republican</span></span></div>
    <span className="data-partnership-cross" aria-hidden="true">×</span>
    <img className="data-mdc-mark" src="/assets/mdc-map-logo-transparent.png" alt="MDC" />
  </div>;
}

export function StrongBordersPartnership() {
 return <div className="strong-borders-partnership" aria-label="Strong Borders in collaboration with Mass Deportation Coalition"><img className="strong-borders-mark" src="/assets/strong-borders-logo.png" alt="Texans for Strong Borders"/><span aria-hidden="true">×</span><img className="strong-mdc-mark" src="/assets/mdc-map-logo-transparent.png" alt="MDC"/></div>;
}
export function DataFeature() {
 return <section className="data-feature section research-feature" id="data" aria-labelledby="data-feature-title"><div className="data-feature-inner">
  <div className="data-feature-top"><span className="section-index">04 / Research</span><a className="research-all-link" href="/data">All research tools <span aria-hidden="true">↗</span></a></div>
  <div className="research-feature-heading"><h2 id="data-feature-title">Explore the data.</h2><p>Migration funding and local immigration enforcement, through tools from our partners.</p></div>
  <div className="research-feature-grid">
   <article className="research-feature-card research-feature-primary"><div className="research-card-brand"><DataPartnership compact/></div><a className="research-card-preview research-card-network" href="/data?tool=migration&amp;view=graph" aria-label="Explore DataRepublican’s Migration Explorer"><img src="/assets/explorer-real-preview.jpg" alt="A view of organizations and funding connections in DataRepublican’s Migration Explorer" width="1101" height="846" loading="lazy"/><span>Organizations & funding</span></a><div className="research-card-copy"><h3>Migration Explorer</h3><p>Follow funding records and connections between organizations.</p><a href="/data?tool=migration">Explore the network <span aria-hidden="true">→</span></a></div></article>
   <div className="research-secondary-grid"><article className="research-feature-card research-feature-secondary"><div className="research-card-brand"><StrongBordersPartnership/></div><a className="research-card-preview research-card-texas" href="/data?tool=287g" aria-label="Explore Strong Borders’ Texas 287(g) Tracker"><img src="/assets/strong-borders-tracker-preview.jpg" alt="Texas counties colored by ICE 287(g) participation and agreement model" width="1363" height="936" loading="lazy"/><span>Texas · Counties & cities</span></a><div className="research-card-copy"><h3>Texas 287(g) Tracker</h3><p>See which Texas agencies participate in ICE’s 287(g) program.</p><a href="/data?tool=287g">Explore the tracker <span aria-hidden="true">→</span></a></div></article></div>
  </div>
  <p className="research-preview-credit">Tool previews: DataRepublican, October 7, 2026 · Strong Borders, October 12, 2026.</p>
 </div></section>;
}
