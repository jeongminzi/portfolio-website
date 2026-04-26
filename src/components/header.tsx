"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@/components/icon";

const items = [
  { label: "Project", href: "/#works" },
  { label: "About", href: "/about" },
  { label: "Achievement", href: "/achievement" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

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
        <div ref={ref} className="relative">
          <button
            type="button"
            data-cursor="hover"
            aria-expanded={open}
            aria-haspopup="menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-fg)] transition-colors hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)]"
          >
            <Icon
              name={open ? "close" : "menu"}
              className="text-[22px]"
              weight={500}
            />
          </button>
          <AnimatePresence>
            {open ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                role="menu"
                className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-[var(--color-fg)] bg-[var(--color-bg)] py-2 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]"
              >
                {items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    data-cursor="hover"
                    onClick={() => setOpen(false)}
                    role="menuitem"
                    className="block px-5 py-2.5 text-sm text-[var(--color-fg)] transition-colors hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
