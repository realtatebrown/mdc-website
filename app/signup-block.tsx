"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

// Public form identifiers from Mailchimp's MDC Website Signup embed.
// Tag 3530070 is the existing Mass Deportation Coalition tag in ItsYourGov.
const signupAction = "https://itsyourgov.us7.list-manage.com/subscribe/post?u=3d9fbfe895cc4e73abb05d73f&id=0f497a321a&f_id=0066afe0f0";
export default function SignupBlock() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [verificationUrl, setVerificationUrl] = useState<string | null>(null);
  const pending = useRef(false);
  const cleanup = useRef<(() => void) | null>(null);
  useEffect(() => () => cleanup.current?.(), []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    pending.current = true;
    setStatus("sending");
    setMessage("");
    setVerificationUrl(null);
    const callback = `mdcSignup_${crypto.randomUUID().replaceAll("-", "")}`;
    const callbacks = window as unknown as Record<string, unknown>;
    const url = new URL(signupAction.replace("/subscribe/post?", "/subscribe/post-json?"));
    for (const [key, value] of new FormData(form)) url.searchParams.set(key, String(value));
    url.searchParams.set("c", callback);
    const script = document.createElement("script");
    let timer: ReturnType<typeof setTimeout>;
    const finish = () => {
      clearTimeout(timer);
      script.remove();
      delete callbacks[callback];
      pending.current = false;
      cleanup.current = null;
    };
    cleanup.current = finish;
    const fail = () => {
      finish();
      setStatus("error");
      setMessage("We couldn’t confirm your signup. Please try again.");
    };
    callbacks[callback] = (response: { result?: string; msg?: string }) => {
      finish();
      const success = response?.result === "success";
      const document = new DOMParser().parseFromString(typeof response?.msg === "string" ? response.msg : "", "text/html");
      const text = document.body.textContent?.replace(/^\d+\s*-\s*/, "").trim();
      setStatus(success ? "success" : "error");
      setMessage(text || (success ? "Thanks for signing up." : "We couldn’t confirm your signup. Please try again."));
      // Render provider replies as text; preserve only safe Mailchimp verification links.
      const link = document.querySelector("a[href]");
      if (!success && link) {
        try {
          const target = new URL(link.getAttribute("href") || "");
          if (target.protocol === "https:" && target.hostname.endsWith(".list-manage.com")) setVerificationUrl(target.href);
        } catch { /* Invalid provider link: keep the text response. */ }
      }
      if (success) form.reset();
    };
    script.src = url.toString();
    script.async = true;
    script.onerror = fail;
    timer = setTimeout(fail, 20000);
    document.body.appendChild(script);
  }
  return <section className="signup-section" id="stay-informed" aria-labelledby="signup-title">
    <div className="signup-inner">
      <div className="signup-main">
        <span className="section-index">Email updates</span>
        <h2 id="signup-title">Sign up for coalition emails.</h2>
        <p>Get news from the coalition by email.</p>
        <form className="signup-form" onSubmit={submit} aria-describedby="signup-help" aria-busy={status === "sending"}>
          <input type="hidden" name="tags" value="3530070" />
          <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
            <input type="text" name="b_3d9fbfe895cc4e73abb05d73f_0f497a321a" tabIndex={-1} defaultValue="" autoComplete="off" />
          </div>
          <div className="signup-names">
            <label htmlFor="signup-first">First name<input id="signup-first" name="FNAME" autoComplete="given-name" maxLength={100} required /></label>
            <label htmlFor="signup-last">Last name<input id="signup-last" name="LNAME" autoComplete="family-name" maxLength={100} required /></label>
          </div>
          <div className="signup-email-row">
            <label htmlFor="signup-email">Email address<input id="signup-email" name="EMAIL" type="email" autoComplete="email" maxLength={254} required /></label>
            <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Signing up…" : "Sign up"}</button>
          </div>
        </form>
        <p id="signup-help" className="signup-help">Unsubscribe at any time.</p>
        <div className="signup-response" role="status" aria-live="polite" aria-atomic="true">
          {message && <p>{message}</p>}
          {verificationUrl && <a href={verificationUrl}>Complete Mailchimp verification</a>}
        </div>
      </div>
      <aside className="signup-social" aria-labelledby="signup-social-title">
        <h3 id="signup-social-title">Follow the coalition.</h3>

        <a href="https://x.com/Phase2Deport" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg><span>Follow on X</span></a>
        <a href="https://www.instagram.com/phase2deport/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg><span>Follow on Instagram</span></a>
      </aside>
    </div>
  </section>;
}
