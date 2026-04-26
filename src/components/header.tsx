"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { href: "#works", label: "Works" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--color-line)] bg-[var(--color-bg)]/85 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          data-cursor="hover"
          className="text-sm font-medium tracking-tight text-[var(--color-fg-strong)]"
        >
          Leejeongmin<span className="text-[var(--color-fg-subtle)]">/</span>
          <span className="text-[var(--color-fg-muted)]">Portfolio</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor="hover"
              className="group relative px-4 py-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg-strong)]"
            >
              <span>{item.label}</span>
              <span className="absolute inset-x-4 -bottom-px h-px origin-left scale-x-0 bg-[var(--color-fg-strong)] transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <a
          href="mailto:hello@leejeongmin.com"
          data-cursor="hover"
          className="hidden text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg-strong)] md:inline"
        >
          hello@leejeongmin.com
        </a>
      </div>
    </header>
  );
}
