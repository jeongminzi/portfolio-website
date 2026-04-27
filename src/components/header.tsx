import Link from "next/link";
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
