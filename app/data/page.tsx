import { socialMetadata } from "../social-metadata";
import type { Metadata } from 'next';
import SiteHeader from '../site-header';
import SiteFooter from '../site-footer';
import DataPartnership from '../data-partnership';
import Explorer from './explorer';
export async function generateMetadata(): Promise<Metadata> { return socialMetadata('Migration Explorer | DataRepublican × MDC', 'Search organizations and funding records in DataRepublican’s Migration Explorer.', '/data', '/assets/explorer-real-preview.jpg', 'DataRepublican Migration Explorer network of organizations and funding'); }
export default function DataPage() {
  return <main className="data-page"><SiteHeader />
    <section className="data-page-intro" aria-labelledby="data-page-title"><DataPartnership compact /><div className="data-page-title-row"><div><span className="data-collaboration-label">In collaboration with DataRepublican</span><h1 id="data-page-title">Migration Explorer</h1></div><p>Look up an organization to see its funding records and links to other groups.</p></div></section>
    <section className="data-workspace" aria-label="Interactive migration research"><Explorer /><details className="data-research-note"><summary>About the data and sources</summary><p>DataRepublican maintains this explorer using public federal records and IRS filings. Each organization’s profile links to its sources. Check those records for details and possible errors.</p><p>A listing shows a funding record, grant, or affiliation; it is not an allegation of wrongdoing. Dollar amounts are documented minimums. Do not add different funding types together. Foreign-born population totals include naturalized citizens and people of all legal statuses.</p><a href="https://datarepublican.com/migration-explorer/network/" target="_blank" rel="noopener noreferrer">View Full Website</a></details></section>
    <SiteFooter /></main>;
}
