"use client";

import { Magnetic } from "@/components/magnetic";
import { Icon } from "@/components/icon";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "GitHub", href: "https://github.com/jeongminzi" },
  { label: "Brunch", href: "https://brunch.co.kr/" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-[var(--color-line)] px-6 py-24 md:px-10 md:py-40"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
            ( 04 ) Contact
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-muted)]">
            Have a project in mind?
          </p>
          <h2 className="mt-6 font-display text-[clamp(48px,9vw,160px)] font-medium leading-[0.95] tracking-[-0.045em] text-[var(--color-fg-strong)]">
            Let's
            <span className="text-[var(--color-fg-muted)]"> talk.</span>
          </h2>

          <div className="mt-12 flex flex-col items-start gap-8">
            <Magnetic strength={0.25}>
              <a
                href="mailto:hello@leejeongmin.com"
                data-cursor-label="Email"
                className="group inline-flex items-center gap-4 rounded-full border border-[var(--color-fg-strong)] px-7 py-5 text-sm uppercase tracking-[0.22em] text-[var(--color-fg-strong)] transition-colors hover:bg-[var(--color-fg-strong)] hover:text-[var(--color-bg)]"
              >
                <span>hello@leejeongmin.com</span>
                <Icon name="north_east" className="text-[18px]" />
              </a>
            </Magnetic>

            <ul className="flex flex-wrap gap-x-8 gap-y-3 pt-6">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="group inline-flex items-baseline gap-2 text-sm uppercase tracking-[0.22em] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg-strong)]"
                  >
                    <span className="relative">
                      {l.label}
                      <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-[var(--color-fg-strong)] transition-transform duration-500 group-hover:scale-x-100" />
                    </span>
                    <Icon name="north_east" className="text-[14px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
