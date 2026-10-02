import EditorialQuote from "./editorial-quote";
import SignupBlock from "./signup-block";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import { officialLogoUrl } from "./official-logos";
import { partnerLinks } from "./partner-links";
import { NewsGrid } from "./news-story";
import PartnersMap, { type PartnerLocation } from "./partners-map";

const priorities = [
  { number:"01", title:"Worksite enforcement", copy:"Make employment enforcement a central part of interior immigration policy.", href:"/playbook#rec-1" },
  { number:"02", title:"State participation", copy:"Build the capacity for states to work with federal authorities on enforcement.", href:"/playbook#rec-19" },
  { number:"03", title:"Meaningful metrics", copy:"Track ICE interior removals clearly so the public can measure progress.", href:"/playbook#rec-20" },
  { number:"04", title:"Debanking", copy:"The coalition calls for Treasury to require proof of lawful presence to open or maintain a U.S. bank account. Recommendation 3 also proposes revisiting federal lending guidance so creditors can consider immigration status when assessing repayment.", href:"/playbook#rec-3" },
];

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



export default function Home() {
  return <main>
    <SiteHeader />

    <section className="hero hero-photo" id="top" aria-labelledby="hero-title">
      <img className="hero-backdrop" src="/assets/trump-speech-hero.jpg" alt="" fetchPriority="high" />
      <div className="hero-inner"><div className="hero-statement">
        <h1 id="hero-title">“I will launch the largest deportation program of criminals in the history of America.”</h1>
        <p className="hero-attribution">— President Donald J. Trump</p>
        <div className="hero-primary-actions"><a className="button" href="/playbook">Read the Playbook</a><a className="hero-link" href="#mission">Explore the coalition</a></div>
      </div></div>
    </section>

    <section className="mission section" id="mission" aria-labelledby="mission-title">
      <div className="section-intro"><span className="section-index">01 / Purpose</span><h2 id="mission-title">Our Purpose</h2></div>
      <div className="mission-body"><p>President Trump can fulfill his signature campaign promise to “conduct the largest mass deportation operation in American history.” Last year’s efforts by the Department of Homeland Security to highlight the ‘Worst of the Worst’ raised the public profile of immigration enforcement.</p><p>Now it is time to move to the second phase: removing large numbers of deportable aliens from the country expeditiously.</p></div>
      <div className="mission-quote"><EditorialQuote id="platform" /></div>
      <div className="purpose-facts">
        <article><span>Our coalition</span><h3>The Coalition</h3><p>Law and policy specialists, former officers, and advocates working across federal and state policy.</p></article>
        <article><span>Our 2026 goal</span><h3>1 million interior removals.</h3><p>The coalition’s target for ICE removals, reported separately from border turnbacks and voluntary departures.</p></article>
        <article><span>Our approach</span><h3>Federal and state action.</h3><p>Coordinated enforcement, expanded operational capacity, and regular public reporting.</p><a href="/playbook">Explore the Playbook</a></article>
      </div>
      <div className="partner-strip"><div className="partner-strip-heading"><span>Coalition partners</span><a href="/partners">Meet the full coalition</a></div><div className="partner-strip-logos">{["American Moment","The Heritage Foundation","Federation for American Immigration Reform","Immigration Accountability Project","Oversight Project","Tea Party Patriots Action"].map(name=><a key={name} href={partnerLinks[name]} target="_blank" rel="noopener noreferrer" title={name}><img src={officialLogoUrl(name)!} alt={name} loading="lazy" /></a>)}</div></div>
    </section>

    <section className="priorities-section section" id="priorities" aria-labelledby="priorities-title">
      <div className="priorities-intro"><span className="section-index">02 / Focus</span><h2 id="priorities-title">Our Priorities</h2><p>The coalition’s policy framework sets out the work needed to expand interior enforcement and measure the outcome.</p><a className="priority-source" href="/principles">The five principles behind our work</a><EditorialQuote id="funding" compact /></div>
      <div className="priority-grid">{priorities.map(item=><article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p><a className="priority-source" href={item.href}>Read the recommendation</a></article>)}</div>
    </section>

    <section className="playbook-section section" id="playbook" aria-labelledby="playbook-title">
      <div className="playbook-copy"><span className="section-index">03 / The Playbook</span><h2 id="playbook-title">The Playbook</h2><p>Read the coalition’s executive-branch recommendations on worksite enforcement, detention capacity, interagency coordination, and public accountability.</p><a className="button" href="/playbook">Read the full playbook</a><EditorialQuote id="eisenhower" compact /></div>
      <a className="publication-cover publication-cover-image" href="/playbook" aria-label="Open the Mass Deportation Coalition Playbook"><img src="/assets/playbook-cover.png" alt="Mass Deportation Coalition Playbook cover featuring the White House" width="1024" height="1305" loading="lazy" /></a>
    </section>

    <section className="partners-section section" id="partners" aria-labelledby="partners-title">
      <div className="partners-heading"><div><span className="section-index">04 / Coalition</span><h2 id="partners-title">Coalition Partners</h2></div><p>Select a state to see its coalition partners. Partner names with a website open the organization’s home page.</p></div>
      <PartnersMap locations={statePartnerLocations} />
      <a className="button partner-directory-button" href="/partners">Explore the full partner directory</a>
    </section>

    <div className="quote-interlude"><EditorialQuote id="promise" /></div>

    <section className="home-news section" aria-labelledby="news-heading">
      <div className="home-news-intro"><span className="section-index">Latest / News</span><h2 id="news-heading">News & Commentary</h2><a className="button" href="/news">View all news</a></div>
      <NewsGrid />
      <div className="quote-pair"><EditorialQuote id="orders" compact /><EditorialQuote id="choice" compact /></div>
    </section>

    <SignupBlock />
    <SiteFooter />
  </main>;
}
