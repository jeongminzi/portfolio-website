"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

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
      className="relative flex min-h-[100svh] items-center justify-center px-6 md:px-10"
    >
      <motion.h1
        style={{ y, opacity }}
        className="font-display text-center text-[clamp(56px,12vw,200px)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--color-fg)]"
      >
        Leejeongmin
      </motion.h1>
    </section>
  );
}
