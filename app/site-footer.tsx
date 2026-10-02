export default function SiteFooter() {
 return <footer className="site-footer">
  <div className="footer-brand"><a href="/" className="footer-brand-link"><img className="coalition-logo" src="/assets/mdc-interlocking-seal.png" alt="" /><span>Mass Deportation<br />Coalition</span></a><p>Policy. Partnership. Accountability.</p></div>
  <nav aria-label="Footer coalition navigation"><h2>The coalition</h2><a href="/#mission">Mission</a><a href="/#priorities">Priorities</a><a href="/partners">Partner directory</a></nav>
  <nav aria-label="Footer resources"><h2>Resources</h2><a href="/playbook">Read the Playbook</a><a href="/news">News & commentary</a></nav>
  <nav aria-label="Social media"><h2>Follow</h2><a href="https://x.com/Phase2Deport" target="_blank" rel="noopener noreferrer">X / @Phase2Deport</a><a href="https://www.instagram.com/phase2deport/" target="_blank" rel="noopener noreferrer">Instagram</a></nav>
  <div className="footer-bottom"><span>© 2026 Mass Deportation Coalition</span><a href="/">Coalition home</a></div>
 </footer>;
}
