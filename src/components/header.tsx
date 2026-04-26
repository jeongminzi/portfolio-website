"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          data-cursor="hover"
          className="font-display text-base font-semibold tracking-tight text-[var(--color-fg)]"
        >
          Leejeongmin
        </Link>
        <a
          href="mailto:hello@leejeongmin.com"
          data-cursor="hover"
          className="text-sm text-[var(--color-fg)]"
        >
          hello@leejeongmin.com
        </a>
      </div>
    </header>
  );
}
