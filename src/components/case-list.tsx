import { projects } from "@/lib/projects";
import { Reveal } from "@/components/reveal";

export function CaseList() {
  return (
    <section className="relative border-t border-[var(--color-line)] px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
            ( 03 ) Case notes
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h3 className="mb-12 font-display text-[clamp(28px,3.4vw,48px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--color-fg-strong)]">
            짧게 정리한 프로젝트 메모.
          </h3>
          <ul className="flex flex-col gap-px overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-line)]">
            {projects.map((p, i) => (
              <li
                key={p.slug}
                id={p.slug}
                className="bg-[var(--color-bg)] px-6 py-10 md:px-10 md:py-14"
              >
                <Reveal delay={i * 0.04}>
                  <article className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-3">
                      <div className="flex items-baseline gap-3">
                        <span className="text-xs tabular-nums text-[var(--color-fg-subtle)]">
                          {p.index}
                        </span>
                        <h4 className="font-display text-2xl font-medium tracking-tight text-[var(--color-fg-strong)]">
                          {p.name}
                        </h4>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
                        <span>{p.category}</span>
                        <span>·</span>
                        <span>{p.year}</span>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <p className="text-base leading-relaxed text-[var(--color-fg)] md:text-lg">
                        {p.summary}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-3">
                      <dl className="space-y-3 text-sm">
                        <div>
                          <dt className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
                            Client
                          </dt>
                          <dd className="text-[var(--color-fg-strong)]">
                            {p.client}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
                            Role
                          </dt>
                          <dd className="text-[var(--color-fg-strong)]">
                            {p.role}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
