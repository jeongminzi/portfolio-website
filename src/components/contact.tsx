"use client";

import { Magnetic } from "@/components/magnetic";
import { Icon } from "@/components/icon";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-[var(--color-line)] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-[1440px] items-end justify-between gap-10">
        <h2 className="font-display text-[clamp(48px,10vw,160px)] font-medium leading-[0.95] tracking-[-0.045em] text-[var(--color-fg-strong)]">
          Contact
        </h2>
        <Magnetic strength={0.25}>
          <a
            href="mailto:hello@leejeongmin.com"
            data-cursor-label="Email"
            className="inline-flex items-center gap-4 rounded-full border border-[var(--color-fg-strong)] px-7 py-5 text-sm uppercase tracking-[0.22em] text-[var(--color-fg-strong)] transition-colors hover:bg-[var(--color-fg-strong)] hover:text-[var(--color-bg)]"
          >
            <span>hello@leejeongmin.com</span>
            <Icon name="north_east" className="text-[18px]" />
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
