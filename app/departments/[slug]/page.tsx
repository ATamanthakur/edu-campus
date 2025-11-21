import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getDepartmentBySlug, getDepartmentSlugs } from "@/lib/content";

interface DepartmentPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getDepartmentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DepartmentPageProps): Promise<Metadata> {
  const department = getDepartmentBySlug(params.slug);
  return {
    title: department ? `${department.title} • Departments` : "Departments • Chandigarh University",
    description: department?.overview,
  };
}

export default function DepartmentPage({ params }: DepartmentPageProps) {
  const department = getDepartmentBySlug(params.slug);

  if (!department) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-12">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 p-8 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-white/70">Departments</p>
        <h1 className="mt-4 text-3xl font-semibold">{department.title}</h1>
        <p className="mt-4 text-white/80">{department.overview}</p>
      </div>
      {department.heroImage && (
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={department.heroImage}
            alt={department.title}
            width={1280}
            height={640}
            className="h-[380px] w-full object-cover"
          />
        </div>
      )}
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
          <h2 className="text-xl font-semibold">Focus Areas</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {department.focusAreas.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
          <h2 className="text-xl font-semibold">Resources</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {department.resources.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
