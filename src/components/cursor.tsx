"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 50, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 50, mass: 0.4 });

  const ringX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.6 });

  const [variant, setVariant] = useState<"default" | "hover" | "label">(
    "default"
  );
  const [label, setLabel] = useState<string>("");
  const [enabled, setEnabled] = useState(false);
  const lastMove = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(fine.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    fine.addEventListener("change", handler);
    return () => fine.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      lastMove.current = performance.now();
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest<HTMLElement>(
        "[data-cursor], a, button, [role='button'], input, textarea, select, label"
      );
      if (!interactive) {
        setVariant("default");
        setLabel("");
        return;
      }
      const mode = interactive.dataset.cursor;
      const text = interactive.dataset.cursorLabel;
      if (text) {
        setVariant("label");
        setLabel(text);
      } else if (mode === "hover" || interactive.tagName) {
        setVariant("hover");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = variant === "hover" ? 64 : variant === "label" ? 96 : 32;
  const dotSize = variant === "default" ? 6 : 0;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{ width: ringSize, height: ringSize }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="flex items-center justify-center rounded-full border border-white/80"
        >
          {variant === "label" && label ? (
            <span className="px-3 text-[11px] uppercase tracking-[0.18em] text-white">
              {label}
            </span>
          ) : null}
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] mix-blend-difference"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{ width: dotSize, height: dotSize, opacity: dotSize ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="rounded-full bg-white"
        />
      </motion.div>
    </>
  );
}
