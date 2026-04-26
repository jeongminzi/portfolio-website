type Variant = "wide" | "tall" | "split";

const palettes: Record<number, string> = {
  0: "from-[#e4e4e7] via-[#d4d4d8] to-[#71717a]",
  1: "from-[#f1f5f9] via-[#cbd5e1] to-[#475569]",
  2: "from-[#f4f4f5] via-[#a1a1aa] to-[#52525b]",
  3: "from-[#e2e8f0] via-[#94a3b8] to-[#334155]",
};

export function ProjectCanvas({
  index,
  variant = "wide",
  label,
}: {
  index: number;
  variant?: Variant;
  label?: string;
}) {
  const palette = palettes[index % 4];
  const ratio =
    variant === "tall"
      ? "aspect-[3/4]"
      : variant === "split"
        ? "aspect-square"
        : "aspect-[16/9]";
  return (
    <figure
      className={`relative ${ratio} w-full overflow-hidden rounded-sm border border-[var(--color-line-strong)]`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${palette}`}>
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4), transparent 55%), radial-gradient(circle at 75% 80%, rgba(15,23,42,0.3), transparent 55%)",
          }}
        />
      </div>
      {label ? (
        <figcaption className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.22em] text-[var(--color-bg)]/85">
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}
