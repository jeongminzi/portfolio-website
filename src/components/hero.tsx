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
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pb-24"
    >
      <motion.div
        style={{ y, opacity }}
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-14"
      >
        <div className="grid grid-cols-12 gap-x-6 gap-y-6 text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-muted)]">
          <div className="col-span-6 md:col-span-3">
            <div className="text-[var(--color-fg-subtle)]">Designer</div>
            <div className="mt-2 text-[var(--color-fg)]">
              Leejeongmin · 이정민
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="text-[var(--color-fg-subtle)]">Discipline</div>
            <div className="mt-2 text-[var(--color-fg)]">Product Design</div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="text-[var(--color-fg-subtle)]">Based in</div>
            <div className="mt-2 text-[var(--color-fg)]">Seoul, KR</div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="text-[var(--color-fg-subtle)]">Available</div>
            <div className="mt-2 text-[var(--color-fg)]">2026 — Selected work</div>
          </div>
        </div>

        <h1 className="font-display text-[clamp(56px,11vw,200px)] font-semibold leading-[0.92] tracking-[-0.045em] text-[var(--color-fg-strong)]">
          <span className="block">Designing</span>
          <span className="block text-[var(--color-fg-muted)]">
            quiet <span className="italic font-light">interfaces</span>
          </span>
          <span className="block">for loud problems.</span>
        </h1>

        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-md text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
            Product Designer based in Seoul. 복잡한 문제를 분해하고,
            팀이 신뢰할 수 있는 시스템과 인터페이스를 만드는 일에 관심이 있습니다.
          </p>
          <a
            href="#works"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[var(--color-fg-strong)]"
          >
            <span>Selected works</span>
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
