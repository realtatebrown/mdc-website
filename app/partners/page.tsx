const states=[
  ["Arizona",["Arizona Freedom Caucus"]],
  ["Florida",["Muckraker"]],
  ["Georgia",["College Republicans of Georgia","Eagle Forum of Georgia","Georgia Freedom Caucus","Tea Party Patriots Action"]],
  ["Idaho",["Idaho Gang of Eight"]],
  ["Illinois",["Illinois Conservative Union","Illinois Freedom Caucus"]],
  ["Indiana",["Save Heritage Indiana"]],
  ["Louisiana",["Citizens for a New Louisiana"]],
  ["Maryland",["Maryland Freedom Caucus"]],
  ["Michigan",["Stand Up Michigan"]],
  ["Missouri",["Missouri Federation of College Republicans"]],
  ["Montana",["Montana Freedom Caucus"]],
  ["New York",["New York Federation of College Republicans"]],
  ["North Carolina",["North Carolina Physicians for Freedom"]],
  ["Ohio",["Ohio College Republican Federation"]],
  ["Oklahoma",["Oklahoma Freedom Caucus"]],
  ["Pennsylvania",["Pennsylvania Federation of College Republicans"]],
  ["South Dakota",["South Dakota Freedom Caucus"]],
  ["Tennessee",["Tennessee Heritage Association"]],
  ["Texas",["Camino Real Republican Women","Texas Border Rescue","Capital Area Conservative Republicans","Conservative Key Kendall County","Dallas Eagle Forum","Denton County Conservative Coalition","Irving Republican Women","Parker County Conservatives","True Texas Project","Grassroots America — We the People","Montgomery County Eagle Forum","Kerr County Patriots","Palo Pinto County Conservatives","The Remembrance Project","Texas Eagle Forum","Tea Party Patriots of Eastland County","Texans for Strong Borders","Texoma Patriots","We the People — Liberty in Action","Young Conservatives of Texas","Young Republicans of Texas"]],
  ["Utah",["Utah Federation of College Republicans"]],
  ["Virginia",["The Conservative Caucus","Fredericksburg Tea Party","Virginia College Republicans"]],
  ["Wisconsin",["Wisconsin Federation of College Republicans"]],
  ["Wyoming",["Wyoming Freedom Caucus"]],
  ["District of Columbia",["American Moment","Center for the American Way of Life","Center for Migration Control","Federation for American Immigration Reform","The Heritage Foundation","Immigration Accountability Project","National Immigration Center for Enforcement","New Guard Press","Oversight Project","Pat Buchanan Society","State Leadership Initiative"]],
] as const;

const individuals=[
  ["Data Republican","Independent data researcher and online profile","DataRepublican.jpg"],
  ["Erik Prince","Entrepreneur and former U.S. Navy SEAL officer","erik-prince.jpg"],
  ["J. Michael Waller, PhD","Senior Analyst for Strategy, Center for Security Policy","jmw-portrait-02.jpg"],
  ["Mark Morgan","Former head of ICE and U.S. Customs and Border Protection","mark-morgan.jpg"],
];

const logoBase="https://massdeportationcoalition.org/images/partners/";
const logos:Record<string,string>={
  "American Moment":"american-moment-lockup-copy-3.png","Arizona Freedom Caucus":"arizona-freedom-caucus.png","Camino Real Republican Women":"screenshot-2026-04-17-at-2.48.02%E2%80%AFpm.png","Capital Area Conservative Republicans":"caparearepclub-logo.png","Center for the American Way of Life":"Cawl.svg","Center for Migration Control":"cmc-logo.jpg","Citizens for a New Louisiana":"cnfl-sig.png","College Republicans of Georgia":"collegerepublicansofgeorgia.jpeg","The Conservative Caucus":"conservative-caucus-logo.png","Conservative Key Kendall County":"ckkc-logo.png","Dallas Eagle Forum":"dallas-eagle-forum.jpg","Denton County Conservative Coalition":"d3c-logo.png","Eagle Forum of Georgia":"cropped-logo-1-1.jpg","Federation for American Immigration Reform":"square-fair-logo-1.png","Fredericksburg Tea Party":"fredericksburgteaparty_logo.png","Georgia Freedom Caucus":"georgia-freedom-caucus.png","Grassroots America — We the People":"grassroots-america.png","The Heritage Foundation":"HeritageCyanBanner.png","Idaho Gang of Eight":"53ba7f60-5a99-449c-b792-8b4b0e4ee233.png","Illinois Conservative Union":"illinois-conservative-union.png","Illinois Freedom Caucus":"illinois_freedom_caucus_logob.png","Immigration Accountability Project":"Immigration-Accountability-Project.png","Irving Republican Women":"irw-logo.png","Kerr County Patriots":"kerrcountypatriots.jpg","Maryland Freedom Caucus":"maryland-freedom-caucus.png","Missouri Federation of College Republicans":"missouricollegerepublicans.jpeg","Montana Freedom Caucus":"montana_freedom_caucus_logob.png","Montgomery County Eagle Forum":"mcef-logo.png","Muckraker":"muckraker_logo_white_clean.png","National Immigration Center for Enforcement":"NICe.jpeg","New Guard Press":"22493996-59a8-473f-bb39-268f00dc6df8.png","New York Federation of College Republicans":"newyorkfederationofcollegerepublicans.jpeg","North Carolina Physicians for Freedom":"screenshot-2026-03-31-at-9.21.33%E2%80%AFam.png","Ohio College Republican Federation":"ohiocollegerepublicans.jpeg","Oklahoma Freedom Caucus":"oklahoma-freedom-caucus.png","Oversight Project":"oversightproject_logo_red.png","Palo Pinto County Conservatives":"palo-pinto-county-conservatives_logo.png","Parker County Conservatives":"parker-county-conservatives_logo.jpg","Pat Buchanan Society":"pat-buchanan-society-logo.jpg","Pennsylvania Federation of College Republicans":"pennsylvaniecollegerepublicans.jpeg","The Remembrance Project":"round-logo-no-background-2018.png","Save Heritage Indiana":"image0.jpeg","South Dakota Freedom Caucus":"south_dakota_freedom_caucus_logo.png","Stand Up Michigan":"stand-up-michigan-logo.jpeg","State Leadership Initiative":"state-leadership-initiative.png","Tea Party Patriots Action":"tpp-action-logo-cmyk.png","Tea Party Patriots of Eastland County":"tppec-logo.png","Tennessee Heritage Association":"tennessee-heritage-association.jpeg","Texas Border Rescue":"tx-border-rescue_logo.png","Texas Eagle Forum":"tx-eagleforum-logo.png","Texans for Strong Borders":"img_9730.png","Texoma Patriots":"texoma-patriots-logo.jpg","True Texas Project":"tte-logo3.jpg","Virginia College Republicans":"virginiacollegerepublicans.jpeg","We the People — Liberty in Action":"wtp-lia-logo.png","Wisconsin Federation of College Republicans":"wiscosinfederationofcollegerepublicans.jpeg","Wyoming Freedom Caucus":"screenshot-2026-03-26-at-12.22.55%E2%80%AFpm.png","Young Conservatives of Texas":"young-conservatives-of-texas.png","Young Republicans of Texas":"yrtlogo2000xtransparent.png"
};

import { partnerLinks } from "../partner-links";

export default function PartnersPage(){
  const organizationCount=states.reduce((total,[,partners])=>total+partners.length,0);
  return <main className="directory-page">
    <div className="top-rule" />
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Mass Deportation Coalition home"><img className="coalition-logo" src="/assets/mass-deportation-coalition-logo.png" alt="Mass Deportation Coalition" /></a>
      <nav aria-label="Primary navigation"><a href="/#mission">Mission</a><a href="/#playbook">Playbook</a><a href="/#principles">Principles</a><a href="/partners" aria-current="page">Partners</a></nav>
      <a className="button button-small" href="/">← Home</a>
    </header>
    <section className="directory-hero">
      <p className="eyebrow">A coalition from across America</p>
      <h1>Partners,<br /><em>state by state.</em></h1>
      <div className="directory-stats"><div><strong>{organizationCount}</strong><span>Organizations</span></div><div><strong>{states.length}</strong><span>States &amp; DC</span></div><div><strong>{individuals.length}</strong><span>Individuals</span></div></div>
    </section>
    <section className="state-directory section">
      <div className="directory-intro"><p className="eyebrow">Organizational partners</p><h2>National<br />directory.</h2><p>Coalition organizations grouped by their represented state.</p></div>
      <div className="state-directory-grid">{states.map(([state,partners],index)=><article key={state} className={state==="Texas"||state==="District of Columbia"?"state-card state-card-wide":"state-card"}>
        <div className="state-card-heading"><span>{String(index+1).padStart(2,"0")}</span><h3>{state}</h3><b>{partners.length}</b></div>
        <div className="partner-logo-grid">{partners.map(partner=>{const content=<><div className="partner-logo-frame">{logos[partner]?<img src={`${logoBase}${logos[partner]}`} alt="" loading="lazy"/>:<span>★</span>}</div><p>{partner}</p><span className="partner-link-mark" aria-hidden="true">↗</span></>;return partnerLinks[partner]?<a className="partner-logo-tile" href={partnerLinks[partner]} target="_blank" rel="noreferrer" key={partner}>{content}</a>:<div className="partner-logo-tile" key={partner}>{content}</div>})}</div>
      </article>)}</div>
    </section>
    <section className="directory-individuals section">
      <div><p className="eyebrow light">Coalition directory</p><h2>Individual<br />partners.</h2></div>
      <div className="individual-list directory-people-list">{individuals.map(([name,role,image])=><article key={name}><img src={`${logoBase}${image}`} alt="" loading="lazy"/><div><h4>{name}</h4><p>{role}</p></div></article>)}</div>
    </section>
    <section className="directory-cta"><p className="eyebrow">Explore the coalition</p><h2>See the national footprint.</h2><div><a className="button" href="/#partners">Return to the map</a><a className="text-link" href="https://massdeportationcoalition.org/partners/" target="_blank" rel="noreferrer">Official directory ↗</a></div></section>
    <footer><div className="wordmark footer-mark"><img className="coalition-logo" src="/assets/mass-deportation-coalition-logo.png" alt="Mass Deportation Coalition" /></div><p>Campaign portfolio · Information adapted from the official Mass Deportation Coalition website.</p><p>© 2026 Mass Deportation Coalition</p></footer>
  </main>;
}
