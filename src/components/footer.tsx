"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const seoul = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Seoul",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(seoul);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-[var(--color-line)] px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-muted)] md:flex-row md:items-center">
        <div>© {new Date().getFullYear()} · Leejeongmin</div>
        <div className="flex items-center gap-6">
          <span>Seoul {time || "--:--:--"}</span>
          <span className="text-[var(--color-fg-subtle)]">·</span>
          <span>Designed & built in Next.js</span>
        </div>
      </div>
    </footer>
  );
}
