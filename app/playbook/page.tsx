import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
import content from './content.json';
import PlaybookReader from './reader';
export const metadata = { title: 'The Playbook | Mass Deportation Coalition' };
export default function PlaybookPage() {
 const matches = [...content.html.matchAll(/<div class="[^"]*\bbook-(?:rec-)?section\b[^"]*" id="([^"]+)">/g)];
 const sections = matches.map((match,index) => ({id:match[1],html:content.html.slice(match.index,matches[index+1]?.index ?? content.html.length)}));
 return <main className="playbook-page">
  <SiteHeader />
  <PlaybookReader chapters={content.chapters} sections={sections} />
  <SiteFooter />
 </main>;
}
