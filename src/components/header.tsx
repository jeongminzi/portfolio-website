import Link from "next/link";
import { FloatingDock, type DockItem } from "@/components/floating-dock";

const items: DockItem[] = [
  { title: "Home", icon: "home", href: "/" },
  { title: "Project", icon: "grid_view", href: "/#works" },
  { title: "About", icon: "person", href: "/about" },
  { title: "Achievement", icon: "emoji_events", href: "/achievement" },
  { title: "Contact", icon: "mail", href: "mailto:hello@leejeongmin.com" },
];

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-6">
      <div className="relative mx-auto flex h-16 max-w-[1440px] items-center px-6 md:px-10">
        <Link
          href="/"
          data-cursor="hover"
          className="pointer-events-auto font-display text-base font-semibold tracking-tight text-[var(--color-fg)]"
        >
          Leejeongmin
        </Link>
        <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <FloatingDock items={items} />
        </div>
      </div>
    </header>
  );
}
