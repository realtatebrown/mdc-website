import EditorialQuote from "../editorial-quote";
import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
import PartnerDirectory from "./partner-directory";
import { states, individuals } from "./data";
export default function PartnersPage(){
  const organizationCount=states.reduce((total,[,partners])=>total+partners.length,0);
  return <main className="directory-page">
    <SiteHeader />
    <section className="directory-hero">
      <p className="eyebrow">Coalition directory</p>
      <h1>Coalition<br /><em>Partners</em></h1>
      <div className="directory-stats"><div><strong>{organizationCount}</strong><span>Organizations</span></div><div><strong>{states.length}</strong><span>States &amp; DC</span></div><div><strong>{individuals.length}</strong><span>Individuals</span></div></div>
    </section>
    <PartnerDirectory states={states} individuals={individuals} />
    <section className="directory-cta"><p className="eyebrow">Partners by state</p><div><a className="button" href="/#partners">Return to the map</a></div></section>
    <div className="quote-interlude"><EditorialQuote id="table" /></div>
    <SiteFooter />
  </main>;
}
