"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 },
    );

    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => revealObserver.observe(el));

    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.transition = "width 1.4s ease";
          }
        });
      },
      { threshold: 0.3 },
    );

    const bars = document.querySelectorAll(".bar-fill");
    bars.forEach((bar) => barObserver.observe(bar));

    return () => {
      revealObserver.disconnect();
      barObserver.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
