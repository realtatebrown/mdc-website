import type { Metadata } from 'next';
import SiteHeader from '../site-header';
import SiteFooter from '../site-footer';
import DataPartnership from '../data-partnership';
import Explorer from './explorer';
export const metadata: Metadata = { title: 'Migration Explorer | Mass Deportation Coalition', description: 'Explore organizations, funding, and documented connections through DataRepublican’s Migration Explorer.' };
export default function DataPage() {
  return <main className="data-page"><SiteHeader />
    <section className="data-page-intro" aria-labelledby="data-page-title"><DataPartnership compact /><div className="data-page-title-row"><div><span className="data-collaboration-label">In collaboration with DataRepublican</span><h1 id="data-page-title">Migration Explorer</h1></div><p>Search organizations, explore their funding, and follow documented connections back to the source.</p></div></section>
    <section className="data-workspace" aria-label="Interactive migration research"><Explorer /><details className="data-research-note"><summary>About the data and sources</summary><p>This explorer is maintained by DataRepublican and uses public federal records and IRS filings. Open organization profiles to review their supporting evidence. Records may contain errors or omissions; verify the linked sources before relying on them.</p><p>Inclusion documents a public funding record, grant, or affiliation and does not allege wrongdoing. Dollar figures are documented minimums; different funding types should not be added together. Foreign-born population counts include naturalized citizens and all legal statuses.</p><a href="https://datarepublican.com/migration-explorer/network/" target="_blank" rel="noopener noreferrer">View Full Website</a></details></section>
    <SiteFooter /></main>;
}
