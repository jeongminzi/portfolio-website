type IconProps = {
  name: string;
  className?: string;
  weight?: 300 | 400 | 500 | 600 | 700;
  fill?: 0 | 1;
};

export function Icon({ name, className, weight = 400, fill = 0 }: IconProps) {
  return (
    <span
      aria-hidden
      className={`material-symbols-rounded ${className ?? ""}`}
      style={{
        fontVariationSettings: `"FILL" ${fill}, "wght" ${weight}, "GRAD" 0, "opsz" 24`,
      }}
    >
      {name}
    </span>
  );
}
