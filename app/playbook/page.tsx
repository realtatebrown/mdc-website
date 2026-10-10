import { socialMetadata } from "../social-metadata";
import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
import content from './content.json';
import PlaybookReader from './reader';
export async function generateMetadata() { return socialMetadata('The Playbook | Mass Deportation Coalition', 'Policies and Operational Strategies to Deport ALL Illegal Aliens from the United States.', '/playbook', '/assets/playbook-cover.png', 'Mass Deportation Coalition Playbook cover'); }
export default function PlaybookPage() {
 const matches = [...content.html.matchAll(/<div class="[^"]*\bbook-(?:rec-)?section\b[^"]*" id="([^"]+)">/g)];
 const sections = matches.map((match,index) => ({id:match[1],html:content.html.slice(match.index,matches[index+1]?.index ?? content.html.length)}));
 return <main className="playbook-page">
  <SiteHeader />
  <PlaybookReader chapters={content.chapters} sections={sections} />
  <SiteFooter />
 </main>;
}
