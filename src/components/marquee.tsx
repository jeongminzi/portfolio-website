"use client";

import { motion } from "motion/react";

const items = [
  "Product Design",
  "Design Systems",
  "B2B Tools",
  "Mobile",
  "Brand",
  "0 → 1",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-[var(--color-line)] py-8">
      <motion.div
        className="flex gap-12 whitespace-nowrap text-[clamp(40px,7vw,96px)] font-display font-medium uppercase tracking-[-0.03em] text-[var(--color-fg-muted)]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            {item}
            <span className="text-[var(--color-fg-subtle)]">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
