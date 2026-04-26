"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { projects, type Project } from "@/lib/projects";
import { useMediaQuery } from "@/lib/use-media-query";
import { Icon } from "@/components/icon";

const TOTAL = projects.length;
const RADIUS = 300;
const CARD_W = 220;
const CARD_H = 290;

const PHASE_ROTATE_END = 0.22;
const PHASE_CONVERGE_END = 0.32;
const SLOT_LENGTH = (1 - PHASE_CONVERGE_END) / TOTAL;

export function Works() {
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  return (
    <section
      id="works"
      className="relative border-t border-[var(--color-line)]"
    >
      {isDesktop ? <DesktopWorks /> : <MobileWorks />}
    </section>
  );
}

function DesktopWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="relative" style={{ height: "560vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--color-bg)]">
        <Chrome progress={scrollYProgress} />

        <div className="absolute inset-0">
          <CenterRing progress={scrollYProgress} />
          {projects.map((p, i) => (
            <WorkCard
              key={p.slug}
              project={p}
              index={i}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <ActiveLabel progress={scrollYProgress} />
      </div>
    </div>
  );
}

function Chrome({ progress }: { progress: MotionValue<number> }) {
  const widthValue = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-6 py-6 md:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-muted)]">
          Selected works
        </div>
        <div className="h-px w-32 bg-[var(--color-line)]">
          <motion.div
            style={{ width: widthValue }}
            className="h-px bg-[var(--color-fg-strong)]"
          />
        </div>
      </div>
    </div>
  );
}

function CenterRing({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [0, PHASE_ROTATE_END, PHASE_CONVERGE_END],
    [0.6, 0.6, 0]
  );
  const rotate = useTransform(progress, [0, PHASE_ROTATE_END], [0, 90]);
  const scale = useTransform(
    progress,
    [PHASE_ROTATE_END, PHASE_CONVERGE_END],
    [1, 0.4]
  );
  return (
    <motion.div
      style={{ opacity, rotate, scale }}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className="rounded-full border border-dashed border-[var(--color-line-strong)]"
        style={{ width: RADIUS * 2, height: RADIUS * 2 }}
      />
    </motion.div>
  );
}

function WorkCard({
  project,
  index,
  progress,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
}) {
  const slotCenter = PHASE_CONVERGE_END + (index + 0.5) * SLOT_LENGTH;
  const startAngle = (index / TOTAL) * 360;

  const x = useTransform(progress, (p) => {
    if (p >= PHASE_CONVERGE_END) return 0;
    const rotProg = Math.min(p / PHASE_ROTATE_END, 1);
    const angle = rotProg * 360 + startAngle;
    const r =
      p < PHASE_ROTATE_END
        ? RADIUS
        : RADIUS *
          (1 -
            (p - PHASE_ROTATE_END) /
              (PHASE_CONVERGE_END - PHASE_ROTATE_END));
    return Math.cos(((angle - 90) * Math.PI) / 180) * r;
  });

  const y = useTransform(progress, (p) => {
    if (p < PHASE_CONVERGE_END) {
      const rotProg = Math.min(p / PHASE_ROTATE_END, 1);
      const angle = rotProg * 360 + startAngle;
      const r =
        p < PHASE_ROTATE_END
          ? RADIUS
          : RADIUS *
            (1 -
              (p - PHASE_ROTATE_END) /
                (PHASE_CONVERGE_END - PHASE_ROTATE_END));
      return Math.sin(((angle - 90) * Math.PI) / 180) * r;
    }
    const dist = (p - slotCenter) / SLOT_LENGTH;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    return dist * vh * 0.95;
  });

  const scale = useTransform(progress, (p) => {
    if (p < PHASE_CONVERGE_END) return 1;
    const dist = Math.abs((p - slotCenter) / SLOT_LENGTH);
    const peak = 2.6;
    return Math.max(0.7, peak - dist * 0.9);
  });

  const opacity = useTransform(progress, (p) => {
    if (p < PHASE_CONVERGE_END) {
      const rotProg = Math.min(p / PHASE_ROTATE_END, 1);
      const angle = (rotProg * 360 + startAngle) % 360;
      const distFromTop = Math.min(angle, 360 - angle);
      return Math.max(0.45, 1 - (distFromTop / 180) * 0.5);
    }
    const dist = Math.abs((p - slotCenter) / SLOT_LENGTH);
    return Math.max(0, Math.min(1, 1.4 - dist * 1.3));
  });

  const zIndex = useTransform(progress, (p) => {
    if (p < PHASE_CONVERGE_END) return index + 1;
    const dist = Math.abs((p - slotCenter) / SLOT_LENGTH);
    return Math.round(100 - dist * 30);
  });

  const overlayOpacity = useTransform(progress, (p) => {
    if (p < PHASE_CONVERGE_END) return 0;
    const dist = Math.abs((p - slotCenter) / SLOT_LENGTH);
    return Math.max(0, 1 - dist * 1.4);
  });

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        zIndex,
        width: CARD_W,
        height: CARD_H,
      }}
      className="absolute left-1/2 top-1/2 -ml-[110px] -mt-[145px]"
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="relative h-full w-full"
      >
        <Link
          href={`/work/${project.slug}`}
          data-cursor-label="View"
          className="relative block h-full w-full overflow-hidden rounded-sm border border-[var(--color-line-strong)] bg-[var(--color-bg-subtle)] shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)]"
        >
          <ProjectImage index={index} />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3 text-[10px] uppercase tracking-[0.22em] text-[var(--color-fg-strong)]">
            <span>{project.index}</span>
          </div>
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-[var(--color-line)] bg-[var(--color-bg)]/95 p-4 backdrop-blur"
          >
            <div className="font-display text-base font-medium tracking-tight text-[var(--color-fg-strong)]">
              {project.name}
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
              <span>{project.category}</span>
              <Icon
                name="north_east"
                className="text-[14px] text-[var(--color-fg-strong)]"
              />
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

function ProjectImage({ index }: { index: number }) {
  const variants = [
    "from-[#e4e4e7] via-[#d4d4d8] to-[#71717a]",
    "from-[#f1f5f9] via-[#cbd5e1] to-[#475569]",
    "from-[#f4f4f5] via-[#a1a1aa] to-[#52525b]",
    "from-[#e2e8f0] via-[#94a3b8] to-[#334155]",
  ];
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${variants[index]}`}>
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), transparent 55%), radial-gradient(circle at 70% 75%, rgba(15,23,42,0.25), transparent 55%)",
        }}
      />
    </div>
  );
}

function ActiveLabel({ progress }: { progress: MotionValue<number> }) {
  const labelIndex = useTransform(progress, (p) => {
    if (p < PHASE_CONVERGE_END) {
      const rotProg = Math.min(p / PHASE_ROTATE_END, 1);
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < TOTAL; i += 1) {
        const angle = (rotProg * 360 + (i / TOTAL) * 360) % 360;
        const dist = Math.min(angle, 360 - angle);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      return best;
    }
    const sub = Math.min(
      Math.max((p - PHASE_CONVERGE_END) / (1 - PHASE_CONVERGE_END), 0),
      0.999
    );
    return Math.floor(sub * TOTAL);
  });

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const unsub = labelIndex.on("change", (v) => setIdx(Math.round(v)));
    return () => unsub();
  }, [labelIndex]);

  const project = projects[idx] ?? projects[0];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 border-t border-[var(--color-line)] bg-[var(--color-bg)]/85 px-6 py-5 backdrop-blur md:px-10">
      <div className="mx-auto flex max-w-[1440px] items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-4">
          <span className="text-[11px] tabular-nums text-[var(--color-fg-subtle)]">
            {project.index} / {String(TOTAL).padStart(2, "0")}
          </span>
          <motion.span
            key={project.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-2xl font-medium tracking-tight text-[var(--color-fg-strong)] md:text-3xl"
          >
            {project.name}
          </motion.span>
        </div>
      </div>
    </div>
  );
}

function MobileWorks() {
  return (
    <div className="px-6 py-20">
      <ul className="space-y-6">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="block overflow-hidden rounded-sm border border-[var(--color-line-strong)] bg-[var(--color-bg-subtle)]"
            >
              <div className="relative h-48">
                <ProjectImage index={i} />
              </div>
              <div className="border-t border-[var(--color-line)] bg-[var(--color-bg)] p-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
                  {p.index}
                </div>
                <div className="mt-2 font-display text-2xl font-medium tracking-tight text-[var(--color-fg-strong)]">
                  {p.name}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-muted)]">
                  {p.category}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
