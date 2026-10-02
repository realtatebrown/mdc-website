import SiteFooter from "../site-footer";
import content from './content.json';
import PlaybookReader from './reader';
export const metadata = { title: 'The Playbook | Mass Deportation Coalition' };
export default function PlaybookPage() {
 const matches = [...content.html.matchAll(/<div class="[^"]*\bbook-(?:rec-)?section\b[^"]*" id="([^"]+)">/g)];
 const sections = matches.map((match,index) => ({id:match[1],html:content.html.slice(match.index,matches[index+1]?.index ?? content.html.length)}));
 return <main className="playbook-page">
  <header className="site-header"><a className="wordmark" href="/" aria-label="Mass Deportation Coalition home"><img className="coalition-logo" src="/assets/mdc-architectural-badge.png" alt=""/><span className="brand-name">Mass Deportation<span>Coalition</span></span></a><nav aria-label="Primary navigation"><a href="/#mission">Mission</a><a href="/#priorities">Priorities</a><a href="/playbook" aria-current="page">Playbook</a><a href="/partners">Partners</a><a href="/news">News</a></nav><a className="header-action" href="/">Home</a></header>
  <PlaybookReader chapters={content.chapters} sections={sections} />
  <SiteFooter />
 </main>;
}
