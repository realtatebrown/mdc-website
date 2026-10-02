import SiteFooter from "../site-footer";
import { NewsStory } from '../news-story';
export const metadata = { title: 'News | Mass Deportation Coalition', description: 'News and commentary from across the coalition.' };
export default function NewsPage() {
 return <main className="news-page">
  <header className="site-header"><a className="wordmark" href="/" aria-label="Mass Deportation Coalition home"><img className="coalition-logo" src="/assets/mdc-interlocking-seal.png" alt=""/><span className="brand-name">Mass Deportation<span>Coalition</span></span></a><nav aria-label="Primary navigation"><a href="/#mission">Mission</a><a href="/#priorities">Priorities</a><a href="/playbook">Playbook</a><a href="/partners">Partners</a><a href="/news" aria-current="page">News</a></nav><a className="header-action" href="/playbook">Read the Playbook</a></header>
  <section className="news-page-intro"><span className="section-index">From the coalition</span><h1>News &amp; commentary.</h1><p>Reporting, perspectives, and policy debate from across the coalition.</p></section>
  <section className="news-page-stories" aria-label="Latest articles"><NewsStory /></section>
  <SiteFooter />
 </main>;
}
