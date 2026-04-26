export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-muted)]">
        <div>© {new Date().getFullYear()} Leejeongmin</div>
        <a
          href="mailto:hello@leejeongmin.com"
          data-cursor="hover"
          className="transition-colors hover:text-[var(--color-fg-strong)]"
        >
          hello@leejeongmin.com
        </a>
      </div>
    </footer>
  );
}
