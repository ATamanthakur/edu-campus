import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getCourseBySlug, getCourseSlugs } from "@/lib/content";

interface CoursePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = getCourseBySlug(params.slug);
  return {
    title: course ? `${course.title} • Courses` : "Courses • Chandigarh University",
    description: course?.overview,
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-12">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-white/70">Undergraduate & Postgraduate</p>
        <h1 className="mt-4 text-3xl font-semibold">{course.title}</h1>
        <p className="mt-4 text-white/80">{course.overview}</p>
      </div>
      {course.heroImage && (
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <Image src={course.heroImage} alt={course.title} width={1280} height={640} className="h-[380px] w-full object-cover" />
        </div>
      )}
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
          <h2 className="text-xl font-semibold">Program Highlights</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {course.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-red-500" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
          <h2 className="text-xl font-semibold">Career Outcomes</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {course.outcomes.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
