import { socialMetadata } from "../social-metadata";
import type { Metadata } from 'next';
import SiteHeader from '../site-header';
import SiteFooter from '../site-footer';
import ResearchWorkspace from './research-workspace';
export async function generateMetadata(): Promise<Metadata> { return socialMetadata('Research | Mass Deportation Coalition', 'Explore migration funding with DataRepublican and Texas 287(g) participation with Strong Borders.', '/data', '/assets/explorer-real-preview.jpg', 'Research tools from DataRepublican and Strong Borders'); }
export default async function DataPage({searchParams}:{searchParams?:Promise<Record<string,string|string[]|undefined>>}={}) {
 const params=await searchParams;
 return <main className="data-page research-hub"><SiteHeader />
  <section className="research-hub-intro" aria-labelledby="data-page-title"><span className="section-index">MDC / Research</span><h1 id="data-page-title">Research from our partners.</h1><p>Explore migration funding and local immigration enforcement.</p></section>
  <div className="research-workspace"><ResearchWorkspace initialTool={params?.tool==='287g'?'287g':'migration'}/></div>
  <SiteFooter /></main>;
}
