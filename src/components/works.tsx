"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { projects } from "@/lib/projects";
import { Icon } from "@/components/icon";

export function Works() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.5 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section
      id="works"
      className="relative border-t border-[var(--color-line)] px-6 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-12 gap-6 pb-16 md:pb-24">
          <div className="col-span-12 md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
              ( 01 ) Selected works
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-[clamp(36px,5vw,72px)] font-medium leading-[1.05] tracking-[-0.035em] text-[var(--color-fg-strong)]">
              네 개의 제품, 하나의 태도.
              <span className="block text-[var(--color-fg-muted)]">
                구조를 먼저 설계하고, 디테일로 마감합니다.
              </span>
            </h2>
          </div>
        </div>

        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={() => setHovered(null)}
          className="relative"
        >
          <ul className="border-t border-[var(--color-line)]">
            {projects.map((p, i) => (
              <li
                key={p.slug}
                onMouseEnter={() => setHovered(i)}
                className="group relative border-b border-[var(--color-line)]"
              >
                <a
                  href={`#${p.slug}`}
                  data-cursor-label="View"
                  className="grid grid-cols-12 items-center gap-4 py-8 md:py-12"
                >
                  <span className="col-span-2 text-xs tabular-nums text-[var(--color-fg-subtle)] md:col-span-1">
                    {p.index}
                  </span>
                  <span className="col-span-10 font-display text-[clamp(32px,5.5vw,80px)] font-medium leading-none tracking-[-0.035em] text-[var(--color-fg-muted)] transition-colors duration-500 group-hover:text-[var(--color-fg-strong)] md:col-span-6">
                    <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                      {p.name}
                    </span>
                  </span>
                  <span className="hidden text-xs uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] md:col-span-3 md:block">
                    {p.category}
                  </span>
                  <span className="col-span-12 hidden text-right text-xs uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] md:col-span-2 md:block">
                    {p.year}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <motion.div
            aria-hidden
            style={{
              x: sx,
              y: sy,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="pointer-events-none absolute left-0 top-0 hidden md:block"
          >
            <AnimatePresence mode="wait">
              {hovered !== null && (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-[320px] w-[440px] overflow-hidden rounded-sm border border-[var(--color-line-strong)] bg-[var(--color-bg-subtle)]"
                >
                  <ProjectThumb index={hovered} />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-[var(--color-line)] bg-[var(--color-bg)]/95 px-5 py-3 backdrop-blur">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
                        {projects[hovered].client} · {projects[hovered].year}
                      </div>
                      <div className="mt-1 text-sm text-[var(--color-fg-strong)]">
                        {projects[hovered].name}
                      </div>
                    </div>
                    <Icon
                      name="north_east"
                      className="text-[20px] text-[var(--color-fg-strong)]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectThumb({ index }: { index: number }) {
  const variants = [
    "from-[#e4e4e7] via-[#d4d4d8] to-[#a1a1aa]",
    "from-[#f1f5f9] via-[#cbd5e1] to-[#64748b]",
    "from-[#f4f4f5] via-[#d4d4d8] to-[#71717a]",
    "from-[#e2e8f0] via-[#94a3b8] to-[#475569]",
  ];
  const grain = [
    "linear-gradient(135deg, transparent 0 49%, rgba(15,23,42,0.06) 49% 51%, transparent 51%)",
    "linear-gradient(45deg, transparent 0 49%, rgba(15,23,42,0.05) 49% 51%, transparent 51%)",
    "radial-gradient(circle at 30% 30%, rgba(15,23,42,0.10), transparent 60%)",
    "radial-gradient(circle at 70% 60%, rgba(15,23,42,0.10), transparent 60%)",
  ];
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${variants[index]}`}>
      <div
        className="absolute inset-0 opacity-80"
        style={{ backgroundImage: grain[index], backgroundSize: "12px 12px" }}
      />
      <div className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.22em] text-[var(--color-fg-strong)]/70">
        Preview
      </div>
    </div>
  );
}
