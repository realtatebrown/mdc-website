export default function SiteFooter() {
 return <footer className="site-footer">
  <div className="footer-brand"><a href="/" className="footer-brand-link"><img className="coalition-logo" src="/assets/mdc-map-logo-transparent.png" alt="Mass Deportation Coalition" /></a></div>
  <nav aria-label="Footer coalition navigation"><h2>The coalition</h2><a href="/#mission">Mission</a><a href="/#priorities">Priorities</a><a href="/principles">Principles</a><a href="/partners">Partner directory</a></nav>
  <nav aria-label="Footer resources"><h2>Resources</h2><a href="/playbook">Read the Playbook</a><a href="/news">News & commentary</a></nav>
  <nav aria-label="Social media"><h2>Follow</h2><a href="https://x.com/Phase2Deport" target="_blank" rel="noopener noreferrer">X / @Phase2Deport</a><a href="https://www.instagram.com/phase2deport/" target="_blank" rel="noopener noreferrer">Instagram</a></nav>
  <div className="footer-bottom"><span>© 2026 Mass Deportation Coalition</span><a className="footer-photo-credit" href="https://www.flickr.com/photos/usdol/35151084394" target="_blank" rel="noopener noreferrer">Homepage photo: U.S. Department of Labor / Shawn T. Moore</a><a href="/">Coalition home</a></div>
 </footer>;
}
