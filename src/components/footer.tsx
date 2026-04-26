export function Footer() {
  return (
    <footer className="px-6 py-8 md:px-10">
      <div className="mx-auto max-w-[1440px] text-center text-xs text-[var(--color-fg)]">
        © {new Date().getFullYear()} Leejeongmin
      </div>
    </footer>
  );
}
