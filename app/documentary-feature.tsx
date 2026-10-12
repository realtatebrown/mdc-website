const documentaryUrl = "https://www.youtube.com/watch?v=EYHWpMswzOI";
export default function DocumentaryFeature() {
 return <section className="documentary-feature documentary-spotlight" id="featured-project" aria-labelledby="documentary-title">
  <div className="documentary-spotlight-bar"><span>Featured documentary</span></div>
  <div className="documentary-inner documentary-release">
   <div className="documentary-screen">
    <iframe src="https://www.youtube-nocookie.com/embed/EYHWpMswzOI" title="Steven Edginton documentary: ‘I’m horrified’ — 92-year-old returns to London after 50 years" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
   </div>
   <div className="documentary-heading documentary-copy">
    <h2 id="documentary-title">“I’m horrified”<span className="documentary-subtitle">92-year-old returns to London after 50 years</span></h2>
    <p className="documentary-meta">A film by Steven Edginton<span aria-hidden="true"> · </span>28 minutes</p>
    <p>Steven Edginton follows 92-year-old Ron Clark back to his childhood streets in Tottenham, exploring how London has changed since he left.</p>
    <a className="button" href={documentaryUrl} target="_blank" rel="noopener noreferrer">Watch now</a>
   </div>
  </div>
  <p className="documentary-support-credit">Supported by the Mass Deportation Coalition.</p>
 </section>;
}
