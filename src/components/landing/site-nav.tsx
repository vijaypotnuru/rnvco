"use client";

import { useEffect, useState } from "react";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`rnv-nav${scrolled ? " scrolled" : ""}`}>
      <a href="/" className="nav-logo" aria-label="RNVCO home">
        <div className="nav-logo-mark">
          <span>R</span>
        </div>
        <span className="nav-logo-text">
          RN<em>V</em>CO
        </span>
      </a>
      <div className="nav-tag">Coming Soon</div>
      <div className="nav-unit">A Rycoon World Unit</div>
    </nav>
  );
}
