import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
import { NewsGrid } from '../news-story';
import NewsArchive from './news-archive';
export const metadata = { title: 'News | Mass Deportation Coalition', description: 'News and commentary from across the coalition.' };
export default function NewsPage() {
 return <main className="news-page">
  <SiteHeader />
  <section className="news-page-intro"><span className="section-index">From the coalition</span><h1>News &amp; commentary.</h1><p>Follow the coalition’s work in the press, in interviews, and through our partners.</p><a className="priority-source" href="#coverage-title">Browse the coverage archive</a></section>
  <section className="news-page-stories" aria-label="Featured articles"><NewsGrid /></section>
  <NewsArchive />
  <SiteFooter />
 </main>;
}
