"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Icon } from "@/components/icon";

export type DockItem = {
  title: string;
  icon: string;
  href: string;
};

const DOCK_HEIGHT = 64;
const ICON_BASE = 32;
const ICON_PEAK = 56;
const FONT_BASE = 18;
const FONT_PEAK = 28;
const MAGNIFY_RANGE = 150;

export function FloatingDock({ items }: { items: DockItem[] }) {
  const mouseX = useMotionValue<number>(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      style={{ height: DOCK_HEIGHT }}
      className="mx-auto flex items-center gap-3 rounded-full border border-[var(--color-fg)]/15 bg-[var(--color-bg)]/80 px-4 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] backdrop-blur-md"
    >
      {items.map((item) => (
        <DockIcon key={item.href} item={item} mouseX={mouseX} />
      ))}
    </motion.div>
  );
}

function DockIcon({
  item,
  mouseX,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };
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

  if (isExternal) {
    return (
      <a
        href={item.href}
        ref={ref}
        aria-label={item.title}
        data-cursor="hover"
        className="group"
      >
        <DockTile width={width} iconSize={iconSize} item={item} />
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      ref={ref}
      aria-label={item.title}
      data-cursor="hover"
      className="group"
    >
      <DockTile width={width} iconSize={iconSize} item={item} />
    </Link>
  );
}

function DockTile({
  width,
  iconSize,
  item,
}: {
  width: MotionValue<number>;
  iconSize: MotionValue<number>;
  item: DockItem;
}) {
  return (
    <motion.div
      style={{ width, height: width }}
      className="relative flex aspect-square items-center justify-center rounded-full text-[var(--color-fg)]"
    >
      <motion.span style={{ fontSize: iconSize }} className="leading-none">
        <Icon name={item.icon} weight={500} />
      </motion.span>
      <span className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--color-fg)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-bg)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {item.title}
      </span>
    </motion.div>
  );
}
