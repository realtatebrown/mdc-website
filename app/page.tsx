
import {loadContent} from "./content/load";
import {partnerViews} from "./content/model";
import DocumentaryFeature from "./documentary-feature";
import { DataFeature } from "./data-partnership";
import EditorialQuote from "./editorial-quote";
import SignupBlock from "./signup-block";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import { HomePartnerNews } from "./news/partner-media";
import PartnersMap, { type PartnerLocation } from "./partners-map";

const priorities = [
  { number:"01", title:"Worksite enforcement", copy:"The Playbook calls for more enforcement at workplaces that employ illegal aliens.", href:"/playbook#rec-1" },
  { number:"02", title:"State participation", copy:"The Playbook proposes a larger role for states in federal immigration enforcement.", href:"/playbook#rec-19" },
  { number:"03", title:"Meaningful metrics", copy:"Publish ICE interior removal numbers separately from other departure figures.", href:"/playbook#rec-20" },
  { number:"04", title:"Debanking", copy:"Recommendation 3 calls for proof of lawful presence to open or keep a U.S. bank account. It also proposes changes to federal lending guidance on immigration status.", href:"/playbook#rec-3" },
];

export default async function Home() {
  const content=await loadContent();

  const {locations:statePartnerLocations,links:partnerLinks,images}=partnerViews(content);
  const featuredPartners=content.partners.filter(p=>p.kind==="Organization"&&p.featured&&p.image);
  return <main>
    <SiteHeader />

    <section className="hero hero-photo" id="top" aria-labelledby="hero-title">
      <img className="hero-backdrop" src="/assets/trump-speech-hero.jpg" alt="" fetchPriority="high" />
      <div className="hero-inner"><div className="hero-statement">
        <h1 id="hero-title">“Following the Eisenhower model, we will carry out the largest domestic deportation operation in American history.”</h1>
        <p className="hero-attribution">President Donald J. Trump<span className="hero-quote-context">Iowa and other rallies · 2023–2024</span></p>
        <div className="hero-primary-actions"><a className="button" href="/playbook">Read the Playbook</a><a className="hero-link" href="#mission">About the coalition</a></div>
      </div></div>
    </section>

    <DocumentaryFeature />

    <section className="mission section" id="mission" aria-labelledby="mission-title">
      <div className="section-intro"><span className="section-index">01 / Purpose</span><h2 id="mission-title">Our Purpose</h2></div>
      <div className="mission-body"><p>President Trump can fulfill his signature campaign promise to “conduct the largest mass deportation operation in American history.” Last year’s efforts by the Department of Homeland Security to highlight the ‘Worst of the Worst’ raised the public profile of immigration enforcement.</p><p>Now it is time to move to the second phase: removing large numbers of deportable aliens from the country expeditiously.</p></div>
      <div className="mission-quote"><EditorialQuote id="platform" /></div>
      <div className="purpose-facts">
        <article><span>Our members</span><h3>The Coalition</h3><p>Immigration policy experts, former law enforcement officers, and groups from across the country.</p></article>
        <article><span>Our 2026 goal</span><h3>1 million interior removals.</h3><p>Our target counts ICE interior removals, not border turnbacks or voluntary departures.</p></article>
        <article><span>Our approach</span><h3>21 recommendations.</h3><p>The Playbook sets out what federal agencies and states can do to reach that target.</p><a href="/playbook">Read the Playbook</a></article>
      </div>
      <div className="partner-strip"><div className="partner-strip-heading"><span>Coalition partners</span><a href="/partners">Meet the full coalition</a></div><div className="partner-strip-logos">{featuredPartners.map(({name})=><a key={name} href={partnerLinks[name]||"/partners"} target="_blank" rel="noopener noreferrer" title={name}><img src={images[name]} alt={name} loading="lazy" /></a>)}</div></div>
    </section>

    <section className="priorities-section section" id="priorities" aria-labelledby="priorities-title">
      <div className="priorities-intro"><span className="section-index">02 / Focus</span><h2 id="priorities-title">Our Priorities</h2><p>Four recommendations from the Playbook.</p><a className="priority-source" href="/principles">Read our five principles</a><EditorialQuote id="funding" compact /></div>
      <div className="priority-grid">{priorities.map(item=><article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p><a className="priority-source" href={item.href}>Read the recommendation</a></article>)}</div>
    </section>

    <section className="playbook-section section" id="playbook" aria-labelledby="playbook-title">
      <div className="playbook-copy"><span className="section-index">03 / The Playbook</span><h2 id="playbook-title">The Playbook</h2><p>Policies and Operational Strategies to Deport <strong>ALL</strong> Illegal Aliens from the United States</p><a className="button" href="/playbook">Read the full playbook</a><EditorialQuote id="promise" compact /></div>
      <a className="publication-cover publication-cover-image" href="/playbook" aria-label="Open the Mass Deportation Coalition Playbook"><img src="/assets/playbook-cover.png" alt="Mass Deportation Coalition Playbook cover featuring the White House" width="1024" height="1305" loading="lazy" /></a>
    </section>

    <DataFeature />

    <section className="partners-section section" id="partners" aria-labelledby="partners-title">
      <div className="partners-heading"><div><span className="section-index">05 / Coalition</span><h2 id="partners-title">Coalition Partners</h2></div><p>Choose a state to see its members. Select a partner’s name to visit their website.</p></div>
      <PartnersMap locations={statePartnerLocations} links={partnerLinks} images={images} />
      <a className="button partner-directory-button" href="/partners">View the full partner directory</a>
    </section>

    <section className="home-news section" aria-labelledby="news-heading">
      <div className="home-news-intro"><span className="section-index">Latest / Partner work</span><h2 id="news-heading">Latest from our partners</h2><a className="button" href="/news">Explore all partner work</a></div>
      <HomePartnerNews items={content.news} />
      <div className="quote-pair"><EditorialQuote id="orders" compact /><EditorialQuote id="choice" compact /></div>
    </section>

    <SignupBlock />
    <SiteFooter />
  </main>;
}
