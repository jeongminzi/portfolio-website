import { Reveal } from "@/components/reveal";

const facts = [
  { k: "Currently", v: "Litmers · Product Designer" },
  { k: "Focus", v: "B2B Tools · Design System · 0→1" },
  { k: "Tooling", v: "Figma · Framer · Notion · Cursor" },
  { k: "Writing", v: "Brunch · Velog (간헐적 업데이트)" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-[var(--color-line)] px-6 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
            ( 02 ) About
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <p className="font-display text-[clamp(28px,3.6vw,52px)] font-light leading-[1.25] tracking-[-0.025em] text-[var(--color-fg-strong)]">
              저는 <em className="not-italic text-[var(--color-fg)]">이정민</em>,
              사용자가 일을 더 잘 끝낼 수 있도록 돕는 인터페이스를 만드는
              Product Designer입니다.{" "}
              <span className="text-[var(--color-fg-muted)]">
                B2B 운영 도구와 0→1 단계의 모바일 서비스를 주로 다루며,
                팀이 의사결정을 빠르게 내릴 수 있도록 디자인 시스템과 패턴을
                정리하는 작업을 좋아합니다.
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
              {facts.map((f) => (
                <div
                  key={f.k}
                  className="flex flex-col gap-2 bg-[var(--color-bg)] px-6 py-7"
                >
                  <dt className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
                    {f.k}
                  </dt>
                  <dd className="text-base text-[var(--color-fg-strong)]">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
