"use client";

import Link from "next/link";
import { useRef, useState, type ComponentType } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export type DockItem = {
  title: string;
  Icon: ComponentType<SvgIconProps>;
  href: string;
};

const DOCK_HEIGHT = 64;
const ICON_BASE = 32;
const ICON_PEAK = 56;
const FONT_BASE = 18;
const FONT_PEAK = 28;
const MAGNIFY_RANGE = 150;
const LABEL_GAP = 14;
const LABEL_HEIGHT = 28;

export function FloatingDock({ items }: { items: DockItem[] }) {
  const mouseX = useMotionValue<number>(Infinity);
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [labelLeft, setLabelLeft] = useState(0);

  function handleEnter(index: number) {
    const stage = stageRef.current;
    const el = itemRefs.current[index];
    if (!stage || !el) return;
    const stageRect = stage.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setLabelLeft(elRect.left + elRect.width / 2 - stageRect.left);
    setHovered(index);
  }

  function handleLeave() {
    mouseX.set(Infinity);
    setHovered(null);
  }

  const labelText = hovered !== null ? items[hovered].title : "";

  return (
    <>
      <GooeyFilter />
      <div
        ref={stageRef}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={handleLeave}
        className="relative"
      >
        {/* Layer A — gooey 적용 (흰 알약끼리 액체처럼 합쳐짐) */}
        <div
          aria-hidden
          className="relative"
          style={{ filter: "url(#dock-goo)" }}
        >
          <div
            style={{ height: DOCK_HEIGHT }}
            className="flex items-center gap-3 rounded-full bg-[var(--color-bg)] px-4"
          >
            {items.map((_, i) => (
              <SizingSlot key={i} index={i} mouseX={mouseX} />
            ))}
          </div>

          <AnimatePresence>
            {hovered !== null ? (
              <motion.div
                key={`pill-${labelText}`}
                initial={{ opacity: 0, y: -10, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                style={{
                  left: labelLeft,
                  top: DOCK_HEIGHT + LABEL_GAP,
                  height: LABEL_HEIGHT,
                }}
                className="absolute flex -translate-x-1/2 items-center whitespace-nowrap rounded-full bg-[var(--color-bg)] px-4"
              >
                <span className="invisible text-[10px] uppercase tracking-[0.18em]">
                  {labelText}
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Layer B — 콘텐츠 (filter 영향 X) */}
        <div
          style={{ height: DOCK_HEIGHT }}
          className="pointer-events-none absolute inset-x-0 top-0 flex items-center gap-3 px-4"
        >
          {items.map((item, i) => (
            <DockIcon
              key={item.href}
              item={item}
              mouseX={mouseX}
              onEnter={() => handleEnter(i)}
              registerRef={(el) => (itemRefs.current[i] = el)}
            />
          ))}
        </div>

        {/* 라벨 텍스트 (filter 영향 X) */}
        <AnimatePresence>
          {hovered !== null ? (
            <motion.span
              key={`text-${labelText}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, delay: 0.05 }}
              style={{
                left: labelLeft,
                top: DOCK_HEIGHT + LABEL_GAP,
                height: LABEL_HEIGHT,
              }}
              className="pointer-events-none absolute flex -translate-x-1/2 items-center whitespace-nowrap px-4 text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg)]"
            >
              {labelText}
            </motion.span>
          ) : null}
        </AnimatePresence>

        {/* 떠있는 그림자 (filter 밖, 자연스러운 광원) */}
        <div
          aria-hidden
          style={{ height: DOCK_HEIGHT }}
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 rounded-full shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)]"
        />
      </div>
    </>
  );
}

function GooeyFilter() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute h-0 w-0"
      width="0"
      height="0"
    >
      <defs>
        <filter id="dock-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

function SizingSlot({
  index: _index,
  mouseX,
}: {
  index: number;
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const widthSync = useTransform(
    distance,
    [-MAGNIFY_RANGE, 0, MAGNIFY_RANGE],
    [ICON_BASE, ICON_PEAK, ICON_BASE]
  );
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className="aspect-square shrink-0 rounded-full"
    />
  );
}

function DockIcon({
  item,
  mouseX,
  onEnter,
  registerRef,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  onEnter: () => void;
  registerRef: (el: HTMLAnchorElement | null) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const setRef = (el: HTMLAnchorElement | null) => {
    ref.current = el;
    registerRef(el);
  };

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distance,
    [-MAGNIFY_RANGE, 0, MAGNIFY_RANGE],
    [ICON_BASE, ICON_PEAK, ICON_BASE]
  );
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconSync = useTransform(
    distance,
    [-MAGNIFY_RANGE, 0, MAGNIFY_RANGE],
    [FONT_BASE, FONT_PEAK, FONT_BASE]
  );
  const iconSize = useSpring(iconSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const isExternal =
    item.href.startsWith("mailto:") || item.href.startsWith("http");
  const Icon = item.Icon;

  const tile = (
    <motion.div
      style={{ width, height: width }}
      onMouseEnter={onEnter}
      className="relative flex aspect-square shrink-0 items-center justify-center text-[var(--color-fg)]/70 transition-colors duration-200 group-hover:text-[var(--color-fg)]"
    >
      <motion.span style={{ fontSize: iconSize }} className="flex leading-none">
        <Icon fontSize="inherit" />
      </motion.span>
    </motion.div>
  );

  if (isExternal) {
    return (
      <a
        href={item.href}
        ref={setRef}
        aria-label={item.title}
        data-cursor="hover"
        className="group pointer-events-auto"
      >
        {tile}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      ref={setRef}
      aria-label={item.title}
      data-cursor="hover"
      className="group pointer-events-auto"
    >
      {tile}
    </Link>
  );
}
