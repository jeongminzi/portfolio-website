import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Icon } from "@/components/icon";
import { ProjectCanvas } from "@/components/project-canvas";
import { getNextProject, getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Leejeongmin`,
    description: project.summary,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);
  const orderIndex = projects.findIndex((p) => p.slug === slug);

  return (
    <>
      <Header />
      <main>
        <section className="px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
          <div className="mx-auto max-w-[1440px]">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-muted)]">
              {project.index} / {String(projects.length).padStart(2, "0")} ·{" "}
              {project.category}
            </div>
            <h1 className="mt-8 font-display text-[clamp(56px,12vw,200px)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--color-fg-strong)]">
              {project.name}
            </h1>
          </div>
        </section>

        <section className="border-t border-[var(--color-line)] px-6 py-12 md:px-10">
          <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-6 md:grid-cols-4">
            <Meta label="Client" value={project.client} />
            <Meta label="Role" value={project.role} />
            <Meta label="Year" value={project.year} />
            <Meta label="Discipline" value={project.category} />
          </dl>
        </section>

        <section className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
                Introduction
              </div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <p className="font-display text-[clamp(22px,2.6vw,38px)] font-light leading-[1.35] tracking-[-0.02em] text-[var(--color-fg)]">
                {project.intro}
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-[1440px]">
            <ProjectCanvas
              index={orderIndex}
              variant="wide"
              label={`${project.name} — cover`}
            />
          </div>
        </section>

        {project.sections.map((section, i) => (
          <section
            key={section.title}
            className="px-6 py-20 md:px-10 md:py-28"
          >
            <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
                  {String(i + 1).padStart(2, "0")} · {section.title}
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <p className="text-[clamp(18px,1.6vw,22px)] leading-relaxed text-[var(--color-fg)]">
                  {section.body}
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-[1440px] grid-cols-12 gap-6">
              {i % 2 === 0 ? (
                <div className="col-span-12">
                  <ProjectCanvas index={orderIndex} variant="wide" />
                </div>
              ) : (
                <>
                  <div className="col-span-12 md:col-span-7">
                    <ProjectCanvas index={orderIndex} variant="split" />
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <ProjectCanvas index={(orderIndex + 1) % 4} variant="tall" />
                  </div>
                </>
              )}
            </div>
          </section>
        ))}

        <section className="border-t border-[var(--color-line)] px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <Link
              href={`/work/${next.slug}`}
              data-cursor-label="Next"
              className="group flex items-end justify-between gap-6"
            >
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
                  Next project
                </div>
                <div className="mt-4 font-display text-[clamp(48px,9vw,140px)] font-medium leading-[0.95] tracking-[-0.045em] text-[var(--color-fg-muted)] transition-colors duration-500 group-hover:text-[var(--color-fg-strong)]">
                  {next.name}
                </div>
              </div>
              <span className="mb-3 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--color-line-strong)] transition-colors group-hover:border-[var(--color-fg-strong)] md:mb-6">
                <Icon
                  name="north_east"
                  className="text-[22px] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </div>
        </section>

        <section className="border-t border-[var(--color-line)] px-6 py-10 md:px-10">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-muted)]">
            <Link
              href="/"
              data-cursor="hover"
              className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-fg-strong)]"
            >
              <Icon name="arrow_back" className="text-[16px]" />
              <span>Back to index</span>
            </Link>
            <span>{project.year}</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
        {label}
      </dt>
      <dd className="mt-2 text-base text-[var(--color-fg-strong)]">{value}</dd>
    </div>
  );
}
