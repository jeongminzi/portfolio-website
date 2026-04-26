import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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

  return (
    <>
      <Header />
      <main>
        <section className="px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48">
          <div className="mx-auto max-w-[1440px]">
            <h1 className="font-display text-[clamp(56px,12vw,200px)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--color-fg)]">
              {project.name}
            </h1>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-10 md:pb-28">
          <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-8 md:grid-cols-4">
            <Meta label="Client" value={project.client} />
            <Meta label="Role" value={project.role} />
            <Meta label="Year" value={project.year} />
            <Meta label="Discipline" value={project.category} />
          </dl>
        </section>

        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-[1100px]">
            <p className="font-display text-[clamp(20px,2.4vw,32px)] font-light leading-[1.55] tracking-[-0.015em] text-[var(--color-fg)]">
              {project.intro}
            </p>
          </div>
        </section>

        <section className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1440px] space-y-6">
            <ProjectCanvas variant="wide" />
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-7">
                <ProjectCanvas variant="square" />
              </div>
              <div className="col-span-12 md:col-span-5">
                <ProjectCanvas variant="tall" />
              </div>
            </div>
            <ProjectCanvas variant="wide" />
          </div>
        </section>

        <section className="px-6 py-32 md:px-10 md:py-40">
          <div className="mx-auto max-w-[1440px]">
            <Link
              href={`/work/${next.slug}`}
              data-cursor-label="Next"
              className="block text-center"
            >
              <span className="font-display text-[clamp(48px,10vw,160px)] font-medium leading-[0.95] tracking-[-0.045em] text-[var(--color-fg)]">
                {next.name}
              </span>
            </Link>
          </div>
        </section>

        <section className="px-6 pb-10 md:px-10">
          <div className="mx-auto max-w-[1440px] text-center">
            <Link
              href="/"
              data-cursor="hover"
              className="text-sm text-[var(--color-fg)]"
            >
              Back
            </Link>
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
      <dt className="text-xs text-[var(--color-fg)]/60">{label}</dt>
      <dd className="mt-2 text-base text-[var(--color-fg)]">{value}</dd>
    </div>
  );
}
