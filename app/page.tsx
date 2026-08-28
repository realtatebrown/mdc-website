import PartnersMap, { type PartnerLocation } from "./partners-map";

const principles = [
  ["01", "Phase II: Mass Deportations", "Move beyond a narrow “worst-of-the-worst” approach and build enforcement policy capable of producing removals at national scale."],
  ["02", "Worksite Enforcement", "Restore worksite enforcement as the centerpiece of a serious interior-enforcement strategy."],
  ["03", "Whole of Government", "Align federal departments and authorities behind a unified effort that encourages self-deportation and enforces the law."],
  ["04", "Complete Transparency", "Publish regular, complete enforcement data so the public can measure whether promises are being kept."],
  ["05", "Meaningful Metrics", "Measure actual ICE interior removals—not turnbacks, maritime interdictions, or other unrelated departures."],
];
const recommendations = ["Substantially enhance worksite enforcement", "Move employment verification online", "Dramatically expand immigration detention", "Identify and target visa overstays", "Leverage states to participate", "Track and publicize meaningful benchmarks"];
const partnerLocations: PartnerLocation[] = [
  { city:"Washington", state:"DC", lat:38.9072, lon:-77.0369, partners:["American Moment","Center for the American Way of Life","Center for Migration Control","Federation for American Immigration Reform","The Heritage Foundation","Immigration Accountability Project","National Immigration Center for Enforcement","New Guard Press","Oversight Project","Pat Buchanan Society","State Leadership Initiative"] },
  { city:"Phoenix", state:"AZ", lat:33.4484, lon:-112.074, partners:["Arizona Freedom Caucus"] },
  { city:"Baton Rouge", state:"LA", lat:30.4515, lon:-91.1871, partners:["Citizens for a New Louisiana"] },
  { city:"Atlanta", state:"GA", lat:33.749, lon:-84.388, partners:["College Republicans of Georgia","Eagle Forum of Georgia","Georgia Freedom Caucus"] },
  { city:"Woodstock", state:"GA", lat:34.1015, lon:-84.5194, partners:["Tea Party Patriots Action"] },
  { city:"Fairfax", state:"VA", lat:38.8462, lon:-77.3064, partners:["The Conservative Caucus"] },
  { city:"Fredericksburg", state:"VA", lat:38.3032, lon:-77.4605, partners:["Fredericksburg Tea Party"] },
  { city:"Richmond", state:"VA", lat:37.5407, lon:-77.436, partners:["Virginia College Republicans"] },
  { city:"Boise", state:"ID", lat:43.615, lon:-116.2023, partners:["Idaho Gang of Eight"] },
  { city:"Springfield", state:"IL", lat:39.7817, lon:-89.6501, partners:["Illinois Conservative Union","Illinois Freedom Caucus"] },
  { city:"Annapolis", state:"MD", lat:38.9784, lon:-76.4922, partners:["Maryland Freedom Caucus"] },
  { city:"Jefferson City", state:"MO", lat:38.5767, lon:-92.1735, partners:["Missouri Federation of College Republicans"] },
  { city:"Helena", state:"MT", lat:46.5891, lon:-112.0391, partners:["Montana Freedom Caucus"] },
  { city:"Miami", state:"FL", lat:25.7617, lon:-80.1918, partners:["Muckraker"] },
  { city:"New York", state:"NY", lat:40.7128, lon:-74.006, partners:["New York Federation of College Republicans"] },
  { city:"Raleigh", state:"NC", lat:35.7796, lon:-78.6382, partners:["North Carolina Physicians for Freedom"] },
  { city:"Columbus", state:"OH", lat:39.9612, lon:-82.9988, partners:["Ohio College Republican Federation"] },
  { city:"Oklahoma City", state:"OK", lat:35.4676, lon:-97.5164, partners:["Oklahoma Freedom Caucus"] },
  { city:"Harrisburg", state:"PA", lat:40.2732, lon:-76.8867, partners:["Pennsylvania Federation of College Republicans"] },
  { city:"Indianapolis", state:"IN", lat:39.7684, lon:-86.1581, partners:["Save Heritage Indiana"] },
  { city:"Pierre", state:"SD", lat:44.3683, lon:-100.351, partners:["South Dakota Freedom Caucus"] },
  { city:"Lansing", state:"MI", lat:42.7325, lon:-84.5555, partners:["Stand Up Michigan"] },
  { city:"Nashville", state:"TN", lat:36.1627, lon:-86.7816, partners:["Tennessee Heritage Association"] },
  { city:"Salt Lake City", state:"UT", lat:40.7608, lon:-111.891, partners:["Utah Federation of College Republicans"] },
  { city:"Madison", state:"WI", lat:43.0731, lon:-89.4012, partners:["Wisconsin Federation of College Republicans"] },
  { city:"Cheyenne", state:"WY", lat:41.14, lon:-104.8202, partners:["Wyoming Freedom Caucus"] },
  { city:"El Paso", state:"TX", lat:31.7619, lon:-106.485, partners:["Camino Real Republican Women","Texas Border Rescue"] },
  { city:"Round Rock", state:"TX", lat:30.5083, lon:-97.6789, partners:["Capital Area Conservative Republicans"] },
  { city:"Boerne", state:"TX", lat:29.7947, lon:-98.732, partners:["Conservative Key Kendall County"] },
  { city:"Dallas–Fort Worth", state:"TX", lat:32.7767, lon:-96.797, partners:["Dallas Eagle Forum","Denton County Conservative Coalition","Irving Republican Women","Parker County Conservatives","True Texas Project"] },
  { city:"Tyler", state:"TX", lat:32.3513, lon:-95.3011, partners:["Grassroots America — We the People"] },
  { city:"Spring", state:"TX", lat:30.0799, lon:-95.4172, partners:["Montgomery County Eagle Forum"] },
  { city:"Kerrville", state:"TX", lat:30.0474, lon:-99.1403, partners:["Kerr County Patriots"] },
  { city:"Palo Pinto", state:"TX", lat:32.7673, lon:-98.2987, partners:["Palo Pinto County Conservatives"] },
  { city:"Houston", state:"TX", lat:29.7604, lon:-95.3698, partners:["The Remembrance Project","Texas Eagle Forum"] },
  { city:"Eastland", state:"TX", lat:32.4015, lon:-98.817, partners:["Tea Party Patriots of Eastland County"] },
  { city:"North Texas", state:"TX", lat:33.2148, lon:-97.1331, partners:["Texans for Strong Borders","Texoma Patriots","We the People — Liberty in Action","Young Conservatives of Texas","Young Republicans of Texas"] },
];

const statePartnerLocations=Object.values(partnerLocations.reduce<Record<string,PartnerLocation>>((states,location)=>{
  states[location.state]??={city:"",state:location.state,lat:0,lon:0,partners:[]};
  states[location.state].partners.push(...location.partners);
  return states;
},{})).sort((a,b)=>a.state.localeCompare(b.state));

const individuals = [
  ["Data Republican", "Independent data researcher and online profile"],
  ["Erik Prince", "Entrepreneur and former U.S. Navy SEAL officer"],
  ["J. Michael Waller, PhD", "Senior Analyst for Strategy, Center for Security Policy"],
  ["Mark Morgan", "Former head of ICE and U.S. Customs and Border Protection"],
];

export default function Home() {
  return <main>
    <div className="top-rule" />
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Mass Deportation Coalition home"><img className="coalition-logo" src="/assets/mass-deportation-coalition-logo.jpeg" alt="Mass Deportation Coalition" /></a>
      <nav aria-label="Primary navigation"><a href="#mission">Mission</a><a href="#playbook">Playbook</a><a href="#principles">Principles</a><a href="/partners">Partners</a></nav>
      <a className="button button-small" href="https://massdeportationcoalition.org/" target="_blank" rel="noreferrer">Official Site ↗</a>
    </header>
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Formed February 2026 · United States of America</p>
        <h1>Promises made.<br /><em>Promises kept.</em></h1>
        <p className="hero-lede">A permanent support base for the largest deportation operation in American history.</p>
        <div className="hero-actions"><a className="button" href="https://massdeportationcoalition.org/playbook/" target="_blank" rel="noreferrer">Read the Playbook</a><a className="text-link" href="#mission">Discover the mission ↓</a></div>
      </div>
      <div className="hero-poster" aria-label="Campaign goal: one million ICE interior removals in 2026">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/United_States_Bicentennial_star_1976_%28no_text%29.svg/500px-United_States_Bicentennial_star_1976_%28no_text%29.svg.png" alt="1976 United States Bicentennial ribbon star" />
        <p className="poster-kicker">The 2026 Objective</p><p className="poster-number">1,000,000</p><p className="poster-label">ICE Interior Removals</p><div className="poster-year"><span>★</span><b>2026</b><span>★</span></div>
      </div>
    </section>
    <div className="ticker" aria-hidden="true"><span>Law &amp; Order ★ National Sovereignty ★ Government Accountability ★ The American Worker ★</span></div>
    <section className="mission section" id="mission">
      <div className="section-label">Our Purpose</div>
      <div className="mission-copy"><p className="display-quote">“A permanent support base for mass deportation.”</p><p>The Mass Deportation Coalition brings together immigration law and policy experts, former senior and rank-and-file law-enforcement officials, advocates, and supporters. Its purpose is to turn a defining campaign promise into a durable operational program.</p><p>The coalition’s public framework sets a minimum target of one million ICE interior removals in 2026, creating the logistical, operational, and policy foundation needed to scale enforcement in the years ahead.</p></div>
    </section>
    <section className="playbook section" id="playbook">
      <div className="playbook-intro"><p className="eyebrow light">Mass Deportation Coalition · March 2026</p><h2>The Playbook</h2><p>Twenty-one executive-branch recommendations. One operational framework. A practical path from campaign promise to measurable results.</p><a className="button button-paper" href="https://massdeportationcoalition.org/playbook/" target="_blank" rel="noreferrer">Explore all 21 recommendations ↗</a></div>
      <ol className="recommendations">{recommendations.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
    </section>
    <section className="principles section" id="principles">
      <div className="section-heading"><div><p className="eyebrow">The governing standard</p><h2>Five Principles</h2></div><p>Clear rules for turning public support into transparent, effective interior enforcement.</p></div>
      <div className="principle-grid">{principles.map(([number, title, copy]) => <article key={number}><span className="principle-number">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="partners-section section" id="partners">
      <div className="partners-heading"><div><p className="eyebrow light">A coalition from across America</p><h2>Partners</h2></div><p>Organizations are grouped by state. Select a marker at the center of each represented state to see all coalition partners based there.</p></div>
      <PartnersMap locations={statePartnerLocations} />
      <div className="individuals">
        <div><h3>Individual<br />partners.</h3></div>
        <div className="individual-list">{individuals.map(([name, role]) => <article key={name}><span>★</span><div><h4>{name}</h4><p>{role}</p></div></article>)}</div>
      </div>
      <a className="button button-paper partners-button" href="/partners">View the full partner directory →</a>
    </section>
    <section className="final-cta"><div className="cta-stars">★ ★ ★ ★ ★</div><h2>A sovereign nation.<br />A government faithful to law.</h2><p>Read the policy framework, meet the coalition, and follow the work.</p><a className="button" href="https://massdeportationcoalition.org/" target="_blank" rel="noreferrer">Visit MassDeportationCoalition.org ↗</a></section>
    <footer><div className="wordmark footer-mark"><img className="coalition-logo" src="/assets/mass-deportation-coalition-logo.jpeg" alt="Mass Deportation Coalition" /></div><p>Campaign portfolio · Information adapted from the official Mass Deportation Coalition website.</p><p>© 2026 Mass Deportation Coalition</p></footer>
  </main>;
}
