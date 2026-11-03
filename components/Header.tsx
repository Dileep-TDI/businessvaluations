"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/content/siteContent";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
          : "bg-transparent"
      }`}
    >
      <div className="section-shell flex items-center justify-between gap-6 py-3">
        <a
          href="#top"
          className="inline-flex shrink-0 items-center no-underline"
          aria-label={site.brand}
        >
          <Image
            src={site.images.logo}
            alt={site.brand}
            width={site.images.logoWidth}
            height={site.images.logoHeight}
            priority
            unoptimized
            className="h-14 w-auto object-contain object-left sm:h-16"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 no-underline transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#enquire"
            className="rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-teal-deep"
          >
            Enquire
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/20 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-white/10 lg:hidden">
          <nav className="section-shell flex flex-col gap-1 py-3" aria-label="Mobile">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-2.5 text-white/90 no-underline hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#enquire"
              className="mt-1 rounded-full bg-teal px-3 py-2.5 text-center font-semibold text-white no-underline"
              onClick={() => setOpen(false)}
            >
              Enquire
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
