import {loadContent} from "../content/load";
import NewsContent from "./news-content";
import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
export const metadata = { title: 'News | Mass Deportation Coalition', description: 'Coalition news, interviews, and commentary.' };
export default async function NewsPage() {
 const content=await loadContent();
 return <main className="news-page">
  <SiteHeader />
  <section className="news-page-intro"><span className="section-index">From the coalition</span><h1>News &amp; commentary.</h1><p>Articles and interviews featuring the coalition and its members.</p><a className="priority-source" href="#coverage-title">See all coverage</a></section>
  <NewsContent items={content.news} />
  <SiteFooter />
 </main>;
}
