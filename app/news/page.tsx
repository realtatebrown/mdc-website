import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
import { NewsGrid } from '../news-story';
export const metadata = { title: 'News | Mass Deportation Coalition', description: 'News and commentary from across the coalition.' };
export default function NewsPage() {
 return <main className="news-page">
  <SiteHeader />
  <section className="news-page-intro"><span className="section-index">From the coalition</span><h1>News &amp; commentary.</h1><p>Reporting, perspectives, and policy debate from across the coalition.</p></section>
  <section className="news-page-stories" aria-label="Latest articles"><NewsGrid /></section>
  <SiteFooter />
 </main>;
}
