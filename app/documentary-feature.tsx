const documentaryUrl = "https://www.youtube.com/watch?v=EYHWpMswzOI";
export default function DocumentaryFeature() {
 return <section className="documentary-feature documentary-spotlight" id="featured-project" aria-labelledby="documentary-title">
  <div className="documentary-spotlight-bar"><span>Featured project</span><span className="documentary-release-tag">New documentary</span></div>
  <div className="documentary-inner documentary-release">
   <div className="documentary-heading documentary-copy">
    <span className="section-index">A film by Steven Edginton</span>
    <h2 id="documentary-title"><em>“I’m horrified”:</em> 92-year-old returns to London after 50 years</h2>
    <p className="documentary-meta"><time dateTime="2026-10-10">October 10, 2026</time><span aria-hidden="true"> · </span>27 min 59 sec</p>
    <p>Steven Edginton takes 92-year-old Ron Clark back to Tottenham, where he grew up during the Second World War. More than 50 years after leaving London, Ron revisits his childhood streets.</p>
    <p>The film examines immigration and changes in British life through residents’ memories and interviews with Major General Julian Thompson, historian David Starkey, and demographer Paul Morland.</p>
    <p className="documentary-support">The Mass Deportation Coalition is proud to support Steven Edginton’s documentary.</p>
    <a className="button" href={documentaryUrl} target="_blank" rel="noopener noreferrer">Watch now</a>
   </div>
   <div className="documentary-screen">
    <iframe src="https://www.youtube-nocookie.com/embed/EYHWpMswzOI" title="Steven Edginton documentary: ‘I’m horrified’ — 92-year-old returns to London after 50 years" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
    <a href={documentaryUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
   </div>
  </div>
 </section>;
}
