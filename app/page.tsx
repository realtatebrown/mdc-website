const principles = [
  ["01", "Phase II: Mass Deportations", "Move beyond a narrow “worst-of-the-worst” approach and build enforcement policy capable of producing removals at national scale."],
  ["02", "Worksite Enforcement", "Restore worksite enforcement as the centerpiece of a serious interior-enforcement strategy."],
  ["03", "Whole of Government", "Align federal departments and authorities behind a unified effort that encourages self-deportation and enforces the law."],
  ["04", "Complete Transparency", "Publish regular, complete enforcement data so the public can measure whether promises are being kept."],
  ["05", "Meaningful Metrics", "Measure actual ICE interior removals—not turnbacks, maritime interdictions, or other unrelated departures."],
];
const recommendations = ["Substantially enhance worksite enforcement", "Move employment verification online", "Dramatically expand immigration detention", "Identify and target visa overstays", "Leverage states to participate", "Track and publicize meaningful benchmarks"];
const partners = ["The Heritage Foundation", "Federation for American Immigration Reform", "Tea Party Patriots Action", "American Moment", "Center for Baptist Leadership", "National Immigration Center for Enforcement", "State Leadership Initiative", "Young Conservatives of Texas"];

export default function Home() {
  return <main>
    <div className="top-rule" />
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Mass Deportation Coalition home"><span className="wordmark-star">★</span><span>Mass Deportation<br />Coalition</span></a>
      <nav aria-label="Primary navigation"><a href="#mission">Mission</a><a href="#playbook">Playbook</a><a href="#principles">Principles</a><a href="#coalition">Coalition</a></nav>
      <a className="button button-small" href="https://massdeportationcoalition.org/" target="_blank" rel="noreferrer">Official Site ↗</a>
    </header>
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Formed February 2026 · United States of America</p>
        <h1>Promises made.<br /><em>Promises kept.</em></h1>
        <p className="hero-lede">A permanent support base for the largest deportation operation in American history.</p>
        <div className="hero-actions"><a className="button" href="https://massdeportationcoalition.org/playbook/" target="_blank" rel="noreferrer">Read the Playbook</a><a className="text-link" href="#mission">Discover the mission ↓</a></div>
      </div>
      <div className="hero-poster" aria-label="Campaign goal: one million ICE interior removals in 2026">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/United_States_Bicentennial_star_1976_%28no_text%29.svg/500px-United_States_Bicentennial_star_1976_%28no_text%29.svg.png" alt="1976 United States Bicentennial ribbon star" />
        <p className="poster-kicker">The 2026 Objective</p><p className="poster-number">1,000,000</p><p className="poster-label">ICE Interior Removals</p><div className="poster-year"><span>★</span><b>2026</b><span>★</span></div>
      </div>
    </section>
    <div className="ticker" aria-hidden="true"><span>Law &amp; Order ★ National Sovereignty ★ Government Accountability ★ The American Worker ★</span></div>
    <section className="mission section" id="mission">
      <div className="section-label">Our Purpose</div>
      <div className="mission-copy"><p className="display-quote">“A permanent support base for mass deportation.”</p><p>The Mass Deportation Coalition brings together immigration law and policy experts, former senior and rank-and-file law-enforcement officials, advocates, and supporters. Its purpose is to turn a defining campaign promise into a durable operational program.</p><p>The coalition’s public framework sets a minimum target of one million ICE interior removals in 2026, creating the logistical, operational, and policy foundation needed to scale enforcement in the years ahead.</p></div>
    </section>
    <section className="playbook section" id="playbook">
      <div className="playbook-intro"><p className="eyebrow light">Mass Deportation Coalition · March 2026</p><h2>The Playbook</h2><p>Twenty-one executive-branch recommendations. One operational framework. A practical path from campaign promise to measurable results.</p><a className="button button-paper" href="https://massdeportationcoalition.org/playbook/" target="_blank" rel="noreferrer">Explore all 21 recommendations ↗</a></div>
      <ol className="recommendations">{recommendations.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
    </section>
    <section className="principles section" id="principles">
      <div className="section-heading"><div><p className="eyebrow">The governing standard</p><h2>Five Principles</h2></div><p>Clear rules for turning public support into transparent, effective interior enforcement.</p></div>
      <div className="principle-grid">{principles.map(([number, title, copy]) => <article key={number}><span className="principle-number">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="coalition section" id="coalition">
      <div className="coalition-copy"><p className="eyebrow light">A national coalition</p><h2>Built to endure.</h2><p>Policy institutions, state leaders, grassroots organizations, law-enforcement veterans, and citizen advocates—united behind enforcement, transparency, and national sovereignty.</p><a className="button button-paper" href="https://massdeportationcoalition.org/partners/" target="_blank" rel="noreferrer">View every coalition partner ↗</a></div>
      <div className="partner-list">{partners.map((partner) => <span key={partner}>{partner}</span>)}</div>
    </section>
    <section className="final-cta"><div className="cta-stars">★ ★ ★ ★ ★</div><h2>A sovereign nation.<br />A government faithful to law.</h2><p>Read the policy framework, meet the coalition, and follow the work.</p><a className="button" href="https://massdeportationcoalition.org/" target="_blank" rel="noreferrer">Visit MassDeportationCoalition.org ↗</a></section>
    <footer><div className="wordmark footer-mark"><span className="wordmark-star">★</span><span>Mass Deportation<br />Coalition</span></div><p>Campaign portfolio · Information adapted from the official Mass Deportation Coalition website.</p><p>© 2026 Mass Deportation Coalition</p></footer>
  </main>;
}
