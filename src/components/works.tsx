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

const TOTAL = projects.length;

// 디스플레이 비율
const ORBIT_VMIN = 0.42;
const BASE_VMIN = 0.09;
const ACTIVE_VMIN = 0.7;

// 진행도 단계
const PHASE_1_END = 0.2;
const PHASE_2_END = 0.32;
const PHASE_3_RAMP = 0.06;

function rotationFor(p: number) {
  if (p < PHASE_2_END) {
    return (p / PHASE_2_END) * 360;
  }
  return 360 + ((p - PHASE_2_END) / (1 - PHASE_2_END)) * 360;
}

function angleFor(p: number, i: number) {
  const start = -90 + (i / TOTAL) * 360;
  return start - rotationFor(p);
}

function rawActivity(angleDeg: number) {
  const norm = (((angleDeg + 90) % 360) + 360) % 360;
  const dist = Math.min(norm, 360 - norm) / 180;
  return Math.max(0, 1 - dist * 4.5);
}

function phase3Mult(p: number) {
  const t = (p - (PHASE_2_END - PHASE_3_RAMP)) / PHASE_3_RAMP;
  return Math.max(0, Math.min(1, t));
}

function activityFor(p: number, i: number) {
  return rawActivity(angleFor(p, i)) * phase3Mult(p);
}

function vmin() {
  if (typeof window === "undefined") return 800;
  return Math.min(window.innerWidth, window.innerHeight);
}

export function Works() {
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  return (
    <section id="works" className="relative">
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
    <div ref={ref} className="relative" style={{ height: "650vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--color-bg)]">
        <Intro progress={scrollYProgress} />
        <div className="absolute inset-0">
          {projects.map((p, i) => (
            <Card
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

function Intro({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [0, PHASE_1_END, PHASE_2_END],
    [1, 1, 0]
  );
  const y = useTransform(
    progress,
    [0, PHASE_1_END, PHASE_2_END],
    [0, 0, 120]
  );
  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6"
    >
      <p className="max-w-xl text-center text-[clamp(16px,1.6vw,20px)] leading-[1.55] text-[var(--color-fg)]">
        A product designer crafting calm interfaces
        <br />
        for everyday tools.
      </p>
    </motion.div>
  );
}

function Card({
  project,
  index,
  progress,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, (p) => {
    const a = angleFor(p, index);
    const eff = activityFor(p, index);
    return Math.cos((a * Math.PI) / 180) * vmin() * ORBIT_VMIN * (1 - eff);
  });
  const y = useTransform(progress, (p) => {
    const a = angleFor(p, index);
    const eff = activityFor(p, index);
    return Math.sin((a * Math.PI) / 180) * vmin() * ORBIT_VMIN * (1 - eff);
  });
  const size = useTransform(progress, (p) => {
    const eff = activityFor(p, index);
    return vmin() * (BASE_VMIN + (ACTIVE_VMIN - BASE_VMIN) * eff);
  });
  const opacity = useTransform(progress, (p) => {
    const eff = activityFor(p, index);
    return 0.65 + eff * 0.35;
  });
  const zIndex = useTransform(progress, (p) =>
    Math.round(activityFor(p, index) * 100) + 1
  );

  return (
    <motion.div
      style={{
        x,
        y,
        width: size,
        height: size,
        opacity,
        zIndex,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="absolute left-1/2 top-1/2"
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor-label="View"
        className="block h-full w-full rounded-full bg-[var(--color-fg)]"
      />
    </motion.div>
  );
}

function ActiveLabel({ progress }: { progress: MotionValue<number> }) {
  const labelIndex = useTransform(progress, (p) => {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < TOTAL; i += 1) {
      const a = angleFor(p, i);
      const norm = (((a + 90) % 360) + 360) % 360;
      const dist = Math.min(norm, 360 - norm);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    return best;
  });

  const opacity = useTransform(progress, (p) => phase3Mult(p));

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const unsub = labelIndex.on("change", (v) => setIdx(Math.round(v)));
    return () => unsub();
  }, [labelIndex]);

  const project = projects[idx] ?? projects[0];

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-40"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[38vh] bg-gradient-to-t from-[var(--color-bg)] from-25% via-[var(--color-bg)]/80 via-60% to-transparent"
      />
      <div className="relative flex justify-center pb-12">
        <motion.span
          key={project.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(28px,3.6vw,48px)] font-medium tracking-[-0.025em] text-[var(--color-fg)]"
        >
          {project.name}
        </motion.span>
      </div>
    </motion.div>
  );
}

function MobileWorks() {
  return (
    <div className="px-6 py-20">
      <ul className="space-y-10">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="block">
              <div className="mx-auto aspect-square w-3/4 rounded-full bg-[var(--color-fg)]" />
              <div className="mt-4 text-center font-display text-2xl font-medium tracking-tight text-[var(--color-fg)]">
                {p.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
