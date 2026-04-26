"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
          Leejeongmin
        </Link>
        <a
          href="mailto:hello@leejeongmin.com"
          data-cursor="hover"
          className="text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg-strong)]"
        >
          hello@leejeongmin.com
        </a>
      </div>
    </header>
  );
}
