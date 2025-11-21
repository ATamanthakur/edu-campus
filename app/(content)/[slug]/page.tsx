import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageBuilder } from "@/components/PageBuilder";
import { getAllPageSlugs, getPageContent } from "@/lib/content";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const page = getPageContent(slug);
  if (!page) {
    return {
      title: "Shivalik College",
    };
  }
  return {
    title: `${page.title} • Shivalik College`,
    description: page.sections[0]?.description ?? page.title,
  };
}

export default function MarketingPage({ params }: PageProps) {
  const { slug } = params;
  const page = getPageContent(slug);

  if (!page) {
    notFound();
  }

  return <PageBuilder sections={page.sections} />;
}
