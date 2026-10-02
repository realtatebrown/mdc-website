import SiteHeader from '../site-header';
import SiteFooter from '../site-footer';
import principles from './content.json';

export const metadata = { title: 'Principles | Mass Deportation Coalition', description: 'The five principles that unite the Mass Deportation Coalition, as set out in its Playbook.' };

export default function PrinciplesPage() {
  return <main className="principles-page">
    <SiteHeader />
    <section className="principles-intro">
      <span className="section-index">Our shared commitment</span>
      <h1>Our Principles</h1>
      <p>Five principles unite every member of the coalition.</p>
      <a href="/playbook#coalition">From the Mass Deportation Coalition Playbook</a>
    </section>
    <ol className="principles-list">
      {principles.map((principle, index) => <li key={principle.title} id={`principle-${index + 1}`}>
        <span className="principles-count" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <h2 dangerouslySetInnerHTML={{__html: principle.title}} />
        <div className="principles-text" dangerouslySetInnerHTML={{__html: principle.html}} />
      </li>)}
    </ol>
    <section className="principles-end"><div><span className="section-index">From principles to policy</span><h2>The recommendations behind the work.</h2><p>Explore the Playbook’s 21 executive-branch recommendations.</p></div><a className="button" href="/playbook">Read the Playbook</a></section>
    <SiteFooter />
  </main>;
}
