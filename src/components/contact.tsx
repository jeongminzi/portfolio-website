"use client";

import { Magnetic } from "@/components/magnetic";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 py-32 md:px-10 md:py-40"
    >
      <div className="mx-auto flex max-w-[1440px] justify-center">
        <Magnetic strength={0.3}>
          <a
            href="mailto:hello@leejeongmin.com"
            data-cursor-label="Email"
            className="inline-flex items-center rounded-full bg-[var(--color-fg)] px-10 py-6 text-base text-[var(--color-bg)] transition-opacity hover:opacity-90"
          >
            Let&apos;s work together
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
