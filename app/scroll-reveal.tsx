"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;
    const selector = [
      ".hero-statement", ".hero-seal", ".section-intro", ".mission-body",
      ".partners-heading", ".map-shell", ".section-link", ".priorities-intro",
      ".priority-grid article", ".playbook-copy", ".playbook-figure", ".closing-card",
      ".directory-hero > *", ".directory-intro", ".state-card",
      ".directory-individuals > *", ".directory-cta > *", "footer > *",
      ".playbook-document .book-section > *"
    ].join(",");
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const reveal = (element: HTMLElement) => {
      element.classList.add("is-revealed");
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target as HTMLElement); });
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    elements.forEach(element => {
      // The opening viewport stays visible, including direct chapter-link arrivals.
      if (element.getBoundingClientRect().top < window.innerHeight) return;
      element.classList.add("scroll-reveal");
      observer.observe(element);
    });
    const showFocused = (event: FocusEvent) => {
      const element = (event.target as HTMLElement)?.closest<HTMLElement>(".scroll-reveal");
      if (element) reveal(element);
    };
    const showAll = () => elements.forEach(element => reveal(element));
    document.addEventListener("focusin", showFocused);
    motion.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", showFocused);
      motion.removeEventListener("change", showAll);
      elements.forEach(element => element.classList.remove("scroll-reveal", "is-revealed"));
    };
  }, [pathname]);
  return null;
}
