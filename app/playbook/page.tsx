import content from './content.json';
export const metadata = { title: 'The Playbook | Mass Deportation Coalition' };
export default function PlaybookPage() {
 return <main className="playbook-page">
  <header className="site-header"><a className="wordmark" href="/" aria-label="Mass Deportation Coalition home"><img className="coalition-logo" src="/assets/mdc-interlocking-seal.png" alt=""/><span className="brand-name">Mass Deportation<span>Coalition</span></span></a><nav aria-label="Primary navigation"><a href="/#mission">Mission</a><a href="/#partners">Partners</a><a href="/#priorities">Priorities</a><a href="/playbook" aria-current="page">Playbook</a></nav><a className="header-action" href="/">Home</a></header>
  <div className="playbook-reader"><aside className="playbook-contents"><details open><summary>In this playbook</summary><nav aria-label="Playbook chapters">{content.chapters.map(chapter=><a key={chapter.id} href={`#${chapter.id}`}>{chapter.label}</a>)}</nav></details></aside><article className="playbook-document" dangerouslySetInnerHTML={{__html:content.html}}/></div>
  <footer><a href="/">Mass Deportation Coalition</a><a href="/partners">Partner directory</a><a href="#cover">Back to top</a></footer>
 </main>;
}
