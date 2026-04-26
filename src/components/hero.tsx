"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Icon } from "@/components/icon";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-24"
    >
      <motion.div
        style={{ y, opacity }}
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-12"
      >
        <h1 className="font-display text-[clamp(56px,12vw,200px)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--color-fg-strong)]">
          Leejeongmin
          <span className="block text-[var(--color-fg-muted)]">
            Product Designer
          </span>
        </h1>

        <div className="flex items-end justify-between">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-muted)]">
            이정민 · Seoul
          </div>
          <a
            href="#works"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[var(--color-fg-strong)]"
          >
            <span>Works</span>
            <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[var(--color-line-strong)] transition-colors group-hover:border-[var(--color-fg-strong)]">
              <Icon
                name="arrow_downward"
                className="text-[18px] transition-transform duration-500 group-hover:translate-y-6"
              />
              <Icon
                name="arrow_downward"
                className="absolute -translate-y-6 text-[18px] transition-transform duration-500 group-hover:translate-y-0"
              />
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
