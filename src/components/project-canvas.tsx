type Variant = "wide" | "tall" | "square";

export function ProjectCanvas({ variant = "wide" }: { variant?: Variant }) {
  const ratio =
    variant === "tall"
      ? "aspect-[3/4]"
      : variant === "square"
        ? "aspect-square"
        : "aspect-[16/9]";
  return <div className={`${ratio} w-full bg-[var(--color-fg)]`} />;
}
