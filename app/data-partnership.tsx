export default function DataPartnership({ compact = false }: { compact?: boolean }) {
  return <div className={`data-partnership${compact ? ' data-partnership-compact' : ''}`} aria-label="DataRepublican in collaboration with Mass Deportation Coalition">
    <div className="data-partner-identity"><img src="/assets/datarepublican-avatar.png" alt="" width="400" height="400" /><span>Data<span className="data-wordmark-light">Republican</span></span></div>
    <span className="data-partnership-cross" aria-hidden="true">×</span>
    <img className="data-mdc-mark" src="/assets/mdc-map-logo-transparent.png" alt="MDC" />
  </div>;
}

function ResearchGraphic() {
  return <figure className="explorer-photo-preview">
    <a href="/data?view=graph" aria-label="Open the interactive Migration Explorer network">
      <div className="explorer-photo-heading"><span>Migration Explorer</span><span>Network</span></div>
      <img src="/assets/explorer-real-preview.jpg" alt="Screenshot of DataRepublican’s real network explorer, showing funders, organizations, state clusters, and the connection legend" width="1101" height="846" loading="lazy" />
      <div className="explorer-photo-action"><span>Open the interactive explorer</span><span aria-hidden="true">↗</span></div>
    </a>
    <figcaption>DataRepublican’s Migration Explorer · Captured October 7, 2026</figcaption>
  </figure>;
}

export function DataFeature() {
  return <section className="data-feature section" id="data" aria-labelledby="data-feature-title"><div className="data-feature-inner">
    <div className="data-feature-top"><span className="section-index">04 / Research</span><span className="data-collaboration-label">In collaboration with DataRepublican</span></div>
    <DataPartnership />
    <div className="data-feature-content">
      <div className="data-feature-copy"><h2 id="data-feature-title">Explore the migration network.</h2><p>See which organizations are involved, how they’re funded, and how they’re connected. Explore the public records with DataRepublican’s Migration Explorer.</p><div className="data-compact-actions"><a className="button data-explore-button" href="/data">Explore the data</a><div className="data-view-links" aria-label="Explorer starting views"><a href="/data?view=cards">Cards</a><span aria-hidden="true">/</span><a href="/data?view=map">Map</a><span aria-hidden="true">/</span><a href="/data?view=graph">Network</a></div></div></div>
      <ResearchGraphic />
    </div>
  </div></section>;
}
