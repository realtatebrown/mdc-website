const states=[
  ["Arizona",["Arizona Freedom Caucus"]],
  ["District of Columbia",["American Moment","Center for the American Way of Life","Center for Migration Control","Federation for American Immigration Reform","The Heritage Foundation","Immigration Accountability Project","National Immigration Center for Enforcement","New Guard Press","Oversight Project","Pat Buchanan Society","State Leadership Initiative"]],
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
] as const;

const individuals=[
  ["Data Republican","Independent data researcher and online profile"],
  ["Erik Prince","Entrepreneur and former U.S. Navy SEAL officer"],
  ["J. Michael Waller, PhD","Senior Analyst for Strategy, Center for Security Policy"],
  ["Mark Morgan","Former head of ICE and U.S. Customs and Border Protection"],
];

export default function PartnersPage(){
  const organizationCount=states.reduce((total,[,partners])=>total+partners.length,0);
  return <main className="directory-page">
    <div className="top-rule" />
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Mass Deportation Coalition home"><span className="wordmark-star">★</span><span>Mass Deportation<br />Coalition</span></a>
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
      <div className="state-directory-grid">{states.map(([state,partners],index)=><article key={state} className={state==="Texas"?"state-card state-card-wide":"state-card"}>
        <div className="state-card-heading"><span>{String(index+1).padStart(2,"0")}</span><h3>{state}</h3><b>{partners.length}</b></div>
        <ul>{partners.map(partner=><li key={partner}>{partner}</li>)}</ul>
      </article>)}</div>
    </section>
    <section className="directory-individuals section">
      <div><p className="eyebrow light">Individual coalition partners</p><h2>People behind<br />the coalition.</h2></div>
      <div className="individual-list">{individuals.map(([name,role])=><article key={name}><span>★</span><div><h4>{name}</h4><p>{role}</p></div></article>)}</div>
    </section>
    <section className="directory-cta"><p className="eyebrow">Explore the coalition</p><h2>See the national footprint.</h2><div><a className="button" href="/#partners">Return to the map</a><a className="text-link" href="https://massdeportationcoalition.org/partners/" target="_blank" rel="noreferrer">Official directory ↗</a></div></section>
    <footer><div className="wordmark footer-mark"><span className="wordmark-star">★</span><span>Mass Deportation<br />Coalition</span></div><p>Campaign portfolio · Information adapted from the official Mass Deportation Coalition website.</p><p>© 2026 Mass Deportation Coalition</p></footer>
  </main>;
}
