import EditorialQuote, { type QuoteId } from '../editorial-quote';
import SiteHeader from '../site-header';
import SiteFooter from '../site-footer';
import principles from './content.json';

export const metadata = { title: 'Principles | Mass Deportation Coalition', description: 'The Mass Deportation Coalition’s five principles, from its Playbook.' };

export default function PrinciplesPage() {
  return <main className="principles-page">
    <SiteHeader />
    <section className="principles-intro">
      <span className="section-index">The coalition</span>
      <h1>Our Principles</h1>
      <p>These are the coalition’s five founding principles.</p>
      <a href="/playbook#coalition">From the Mass Deportation Coalition Playbook</a>
    </section>
    <ol className="principles-list">
      {principles.map((principle, index) => <li key={principle.title} id={`principle-${index + 1}`}>
        <span className="principles-count" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <h2 dangerouslySetInnerHTML={{__html: principle.title}} />
        <div className="principles-text"><div dangerouslySetInnerHTML={{__html: principle.html}} /><EditorialQuote id={(["inauguration", "officers", "whitehouse", "transparency", "arrests"] as QuoteId[])[index]} compact /></div>
      </li>)}
    </ol>
    <section className="principles-end"><div><span className="section-index">The Playbook</span><h2>Read the full plan.</h2><p>21 recommendations for the executive branch.</p></div><a className="button" href="/playbook">Read the Playbook</a></section>
    <SiteFooter />
  </main>;
}
