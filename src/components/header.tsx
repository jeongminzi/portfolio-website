"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import HomeSharp from "@mui/icons-material/HomeSharp";
import AppsSharp from "@mui/icons-material/AppsSharp";
import PersonSharp from "@mui/icons-material/PersonSharp";
import EmojiEventsSharp from "@mui/icons-material/EmojiEventsSharp";
import MailSharp from "@mui/icons-material/MailSharp";
import { FloatingDock, type DockItem } from "@/components/floating-dock";

const items: DockItem[] = [
  { title: "Home", Icon: HomeSharp, href: "/" },
  { title: "Project", Icon: AppsSharp, href: "/#works" },
  { title: "About", Icon: PersonSharp, href: "/about" },
  { title: "Achievement", Icon: EmojiEventsSharp, href: "/achievement" },
  { title: "Contact", Icon: MailSharp, href: "mailto:hello@leejeongmin.com" },
];

const DOCK_WIDTH_ESTIMATE = 280;
const SIDE_PADDING = 24;
const BREAK_LARGE = 1180;
const BREAK_SMALL = 720;

function computeDockX(w: number) {
  const dockW = DOCK_WIDTH_ESTIMATE;
  const centerX = w / 2 - dockW / 2;
  const rightX = w - dockW - SIDE_PADDING;

  if (w >= BREAK_LARGE) return centerX;
  if (w <= BREAK_SMALL) return rightX;

  const t = (BREAK_LARGE - w) / (BREAK_LARGE - BREAK_SMALL);
  return centerX + (rightX - centerX) * t;
}

export function Header() {
  const [x, setX] = useState<number | null>(null);

  useLayoutEffect(() => {
    const update = () => setX(computeDockX(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-6">
      <div className="relative h-16">
        <Link
          href="/"
          data-cursor="hover"
          className="pointer-events-auto absolute left-6 top-1/2 -translate-y-1/2 font-display text-base font-semibold tracking-tight text-[var(--color-fg)] md:left-10"
        >
          Leejeongmin
        </Link>
        {x !== null ? (
          <motion.div
            initial={{ x }}
            animate={{ x }}
            transition={{ type: "spring", stiffness: 110, damping: 22, mass: 0.8 }}
            className="pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2 w-fit"
          >
            <FloatingDock items={items} />
          </motion.div>
        ) : null}
      </div>
    </header>
  );
}
