import SiteFooter from "../site-footer";
import PartnerDirectory from "./partner-directory";
import { states, individuals } from "./data";
export default function PartnersPage(){
  const organizationCount=states.reduce((total,[,partners])=>total+partners.length,0);
  return <main className="directory-page">
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Mass Deportation Coalition home"><img className="coalition-logo" src="/assets/mdc-interlocking-seal.png" alt="" /><span className="brand-name">Mass Deportation<span>Coalition</span></span></a>
      <nav aria-label="Primary navigation"><a href="/#mission">Mission</a><a href="/#priorities">Priorities</a><a href="/playbook">Playbook</a><a href="/partners">Partners</a><a href="/news">News</a></nav>
      <a className="header-action" href="/">Home</a>
    </header>
    <section className="directory-hero">
      <p className="eyebrow">Coalition directory</p>
      <h1>Partners,<br /><em>state by state.</em></h1>
      <div className="directory-stats"><div><strong>{organizationCount}</strong><span>Organizations</span></div><div><strong>{states.length}</strong><span>States &amp; DC</span></div><div><strong>{individuals.length}</strong><span>Individuals</span></div></div>
    </section>
    <PartnerDirectory states={states} individuals={individuals} />
    <section className="directory-cta"><p className="eyebrow">Explore the coalition</p><h2>Explore the partner map.</h2><div><a className="button" href="/#partners">Return to the map</a></div></section>
    <SiteFooter />
  </main>;
}
