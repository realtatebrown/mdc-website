"use client";

// Presentation only until the Mailchimp endpoint and bot protection are configured.
// Never submit or store visitor details while this form is disconnected.
export default function SignupBlock() {
  return <section className="signup-section" id="stay-informed" aria-labelledby="signup-title">
    <div className="signup-inner">
      <div className="signup-main">
        <span className="section-index">Stay connected</span>
        <h2 id="signup-title">Stay informed.</h2>
        <p>Coalition news, policy updates, and new research in your inbox.</p>
        <form className="signup-form" onSubmit={event => event.preventDefault()} aria-describedby="signup-note">
          <div className="signup-names">
            <label htmlFor="signup-first">First name<input id="signup-first" name="firstName" autoComplete="given-name" maxLength={100} required /></label>
            <label htmlFor="signup-last">Last name<input id="signup-last" name="lastName" autoComplete="family-name" maxLength={100} required /></label>
          </div>
          <div className="signup-email-row">
            <label htmlFor="signup-email">Email address<input id="signup-email" name="email" type="email" autoComplete="email" maxLength={254} required /></label>
            <button type="submit" disabled>Sign up</button>
          </div>
          <p id="signup-note" className="signup-note">Email signup is coming soon. This form is not accepting submissions yet.</p>
        </form>
      </div>
      <aside className="signup-social" aria-labelledby="signup-social-title">
        <h3 id="signup-social-title">Follow the coalition.</h3>
        <p>Follow our latest updates on X and Instagram.</p>
        <a href="https://x.com/Phase2Deport" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg><span>Follow on X</span></a>
        <a href="https://www.instagram.com/phase2deport/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg><span>Follow on Instagram</span></a>
      </aside>
    </div>
  </section>;
}
