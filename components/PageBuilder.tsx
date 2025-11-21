"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

import type { HeroLeadForm, Section } from "@/types/content";

const STAGGER_INTERVAL = 70;
const CARD_GRADIENTS = [
  "from-rose-500/15 via-orange-400/10 to-amber-200/20",
  "from-violet-500/15 via-indigo-400/10 to-sky-300/20",
  "from-emerald-400/15 via-lime-300/10 to-teal-200/20",
  "from-blue-500/15 via-cyan-400/10 to-emerald-200/20",
];
const STAT_AURAS = [
  "from-rose-500/60 via-rose-400/15 to-transparent",
  "from-indigo-500/60 via-indigo-400/15 to-transparent",
  "from-emerald-500/60 via-emerald-400/15 to-transparent",
  "from-amber-500/60 via-amber-400/15 to-transparent",
  "from-fuchsia-500/60 via-fuchsia-400/15 to-transparent",
];
const CHIP_ACCENTS = [
  "bg-rose-500/10 text-rose-500",
  "bg-indigo-500/10 text-indigo-500",
  "bg-emerald-500/10 text-emerald-500",
  "bg-amber-500/10 text-amber-600",
  "bg-fuchsia-500/10 text-fuchsia-500",
];

function useViewportReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (
      typeof window === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      node.setAttribute("data-in-view", "true");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.setAttribute("data-in-view", "true");
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return ref;
}

function getStaggerStyle(index: number, gap = STAGGER_INTERVAL): CSSProperties {
  return {
    transitionDelay: `${index * gap}ms`,
  };
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type PageBuilderProps = {
  sections: Section[];
};

export function PageBuilder({ sections }: PageBuilderProps) {
  return (
    <div className="space-y-16 pt-8">
      {sections.map((section) => {
        switch (section.type) {
            case "hero":
              return <HeroSection key={section.id} {...section} />;
            case "ticker":
              return <TickerSection key={section.id} {...section} />;
            case "cta-panel":
              return <CTAPanel key={section.id} {...section} />;
            case "stats":
              return <StatsSection key={section.id} {...section} />;
            case "carousel":
              return <CarouselSection key={section.id} {...section} />;
            case "accordion":
              return <AccordionSection key={section.id} {...section} />;
            case "cards-grid":
              return <CardsGridSection key={section.id} {...section} />;
            case "media-strip":
              return <MediaStripSection key={section.id} {...section} />;
            case "feature-banner":
              return <FeatureBannerSection key={section.id} {...section} />;
            case "split-content":
              return <SplitContentSection key={section.id} {...section} />;
            case "logos":
              return <LogosSection key={section.id} {...section} />;
            case "testimonials":
              return <TestimonialsSection key={section.id} {...section} />;
            case "news":
              return <NewsSection key={section.id} {...section} />;
            case "key-figures":
              return <KeyFiguresSection key={section.id} {...section} />;
            case "promo-banner":
              return <PromoBannerSection key={section.id} {...section} />;
            case "news-grid":
              return <NewsGridSection key={section.id} {...section} />;
            case "virtual-tour":
              return <VirtualTourSection key={section.id} {...section} />;
            case "richtext":
              return <RichTextSection key={section.id} {...section} />;
            default:
              return null;
        }
      })}
    </div>
  );
}

function SectionShell({
  id,
  children,
  title,
  eyebrow,
  className,
  contentClassName,
  eyebrowClassName,
  titleClassName,
}: {
  id?: string;
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  className?: string;
  contentClassName?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
}) {
  const sectionRef = useViewportReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={sectionRef}
      data-in-view="false"
      data-animate-parent
      className="scroll-mt-28"
    >
      <div className={cx("mx-auto max-w-6xl px-1", className)}>
        {eyebrow && (
          <p
            className={cx(
              "text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-red-600/80",
              eyebrowClassName
            )}
            data-animate-child
          >
            {eyebrow}
          </p>
        )}
        {title && (
          <h2
            className={cx("mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl", titleClassName)}
            data-animate-child
            style={getStaggerStyle(1)}
          >
            {title}
          </h2>
        )}
        <div
          className={cx(contentClassName ?? (title ? "mt-8" : "mt-0"))}
          data-animate-child
          style={getStaggerStyle(2)}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function HeroSection(section: Extract<Section, { type: "hero" }>) {
  const hasLeadForm = Boolean(section.leadForm);
  const sectionRef = useViewportReveal<HTMLElement>();

  return (
    <section
      id={section.id}
      ref={sectionRef}
      data-in-view="false"
      data-animate-parent
      className="scroll-mt-28"
    >
      <div className="mx-auto px-4">
        <div className="relative overflow-hidden text-white">
          <div className="absolute inset-0 -z-10 from-slate-950/70 via-slate-900/45 to-slate-900/10" />
          <div
            className="pointer-events-none absolute -left-24 -top-12 -z-10 h-80 w-80 rounded-full bg-red-500/35 blur-[160px]"
            style={{ animation: "pulse-glow 18s ease-in-out infinite" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-24 top-16 -z-10 h-96 w-96 rounded-full bg-orange-400/30 blur-[180px]"
            style={{ animation: "pulse-glow 22s ease-in-out infinite", animationDelay: "400ms" }}
            aria-hidden
          />
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div data-animate-child>
              {section.eyebrow && (
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-red-200">
                  {section.title}
                </p>
              )}
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                {section.eyebrow}
              </h1>
              {section.description && (
                <p className="mt-4 max-w-2xl text-lg text-white/80">{section.description}</p>
              )}
              {section.ctas && section.ctas.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-4">
                  {section.ctas.map((cta, index) => (
                    <Link
                      key={cta.href}
                      href={cta.href}
                      className={`rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition ${
                        cta.style === "secondary"
                          ? "border border-white/40 text-white hover:border-white hover:bg-white/10"
                          : "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-[0_25px_60px_rgba(248,113,113,.35)] hover:opacity-90"
                      }`}
                      data-animate-child
                      style={getStaggerStyle(index)}
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>
              )}
              {section.badges && (
                <div className="mt-6 hidden flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-white/80 sm:flex">
                  {section.badges.map((badge, index) => (
                    <span
                      key={badge.label}
                      className={cx(
                        "rounded-full border px-4 py-2",
                        CHIP_ACCENTS[index % CHIP_ACCENTS.length] ?? "border-white/30 text-white"
                      )}
                      data-animate-child
                      style={getStaggerStyle(index)}
                    >
                      {badge.label}: <strong className="ml-1 text-white">{badge.value}</strong>
                    </span>
                  ))}
                </div>
              )}
              {section.metrics && (
                <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-3">
                  {section.metrics.map((metric, index) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/15 bg-white/5 p-4"
                      data-animate-child
                      style={getStaggerStyle(index)}
                    >
                      <p className="text-3xl font-semibold text-white">{metric.value}</p>
                      <p className="text-sm text-white/70">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              data-animate-child
              className={cx(hasLeadForm && "flex justify-end")}
              style={getStaggerStyle(3)}
            >
              {hasLeadForm && section.leadForm ? (
                <HeroLeadForm form={section.leadForm} />
              ) : (
                section.gallery && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {section.gallery.map((item, index) => (
                      <div
                        key={item.src}
                        className="group overflow-hidden rounded-2xl border border-white/15 bg-white/10"
                        data-animate-child
                        style={{
                          ...getStaggerStyle(index),
                          animation: "floaty 14s ease-in-out infinite",
                          animationDelay: `${index * 150}ms`,
                        }}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={320}
                          height={200}
                          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroLeadForm({ form }: { form: HeroLeadForm }) {
  return (
    <form
      action={form.action ?? "https://cucet.cuchd.in"}
      className="rounded-[28px] border border-white/10 bg-white/95 p-6 text-slate-900 shadow-[-20px_20px_60px_rgba(15,23,42,0.35)] mt-10 w-100"
    >
      <h3 className="text-xl font-semibold text-slate-900">{form.title}</h3>
      {form.description && <p className="mt-1 text-sm text-slate-600">{form.description}</p>}
      <div className="mt-4 space-y-4">
        {form.fields.map((field) => (
          <label key={field.name} className="block text-sm font-medium text-slate-700">
            {field.label}
            {field.type === "select" ? (
              <select
                name={field.name}
                required={field.required}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                defaultValue=""
              >
                <option value="" disabled>
                  {field.placeholder ?? "Select"}
                </option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type ?? "text"}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            )}
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="mt-5 w-full rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_20px_40px_rgba(248,113,113,0.45)]"
      >
        {form.cta.label}
      </button>
      {form.disclaimer && <p className="mt-3 text-xs text-slate-500">{form.disclaimer}</p>}
    </form>
  );
}

function TickerSection(section: Extract<Section, { type: "ticker" }>) {
  const tickerRef = useViewportReveal<HTMLDivElement>();

  return (
    <div
      ref={tickerRef}
      data-in-view="false"
      data-animate-parent
      className="relative overflow-hidden border border-slate-200 bg-gradient-to-r from-rose-50 via-white to-sky-50"
      aria-live="polite"
    >
      <div className="ticker-mask overflow-hidden border-y border-slate-100">
        <div className="marquee-track flex items-center gap-12 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-600">
          {section.items.concat(section.items).map((item, index) => (
            <span key={`${item}-${index}`} className="inline-flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTAPanel(section: Extract<Section, { type: "cta-panel" }>) {
  return (
    <SectionShell id={section.id}>
      <div className="relative rounded-[32px] border border-white/20 bg-gradient-to-r from-rose-600 via-red-500 to-orange-400 p-8 text-white shadow-[0_40px_100px_rgba(248,113,113,0.4)]">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_55%)]" />
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Important date</p>
            <p className="text-2xl font-semibold">{section.title}</p>
            {section.description && <p className="mt-2 text-white/80">{section.description}</p>}
          </div>
          {section.ctas && (
            <div className="flex flex-wrap gap-3">
              {section.ctas.map((cta, index) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="rounded-full bg-white/20 px-5 py-3 text-sm font-semibold"
                  data-animate-child
                  style={getStaggerStyle(index)}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}

function StatsSection(section: Extract<Section, { type: "stats" }>) {
  return (
    <SectionShell
      id={section.id}
      title={section.title}
      className="text-white"
      eyebrowClassName="text-white/70"
      titleClassName="text-3xl sm:text-4xl text-white"
      contentClassName="mt-10"
    >
      <div className="relative overflow-hidden rounded-[44px] border border-white/15 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900/90 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.7)]">
        <div className="pointer-events-none absolute inset-y-0 left-1/3 w-1/2 bg-[radial-gradient(circle_at_center,rgba(248,113,113,0.25),transparent_60%)] blur-3xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {section.items.map((stat, index) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white backdrop-blur shadow-[0_25px_60px_rgba(15,23,42,0.45)]"
              data-animate-child
              style={getStaggerStyle(index)}
            >
              <div
                className={cx(
                  "pointer-events-none absolute inset-0 opacity-70 bg-gradient-to-b",
                  STAT_AURAS[index % STAT_AURAS.length]
                )}
                aria-hidden
              />
              <div className="relative">
                <p className="text-4xl font-semibold tracking-tight">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-2 text-sm text-white/70">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function CarouselSection(section: Extract<Section, { type: "carousel" }>) {
  return (
    <SectionShell id={section.id} title={section.title} contentClassName="mt-10">
      <div className="rounded-[34px] border border-slate-900/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-900/70 p-6 text-white shadow-[0_40px_120px_rgba(15,23,42,0.65)]">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {section.cards.map((card, index) => (
            <article
              key={card.title}
              className="relative flex min-w-[280px] max-w-[360px] snap-start flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              data-animate-child
              style={getStaggerStyle(index)}
            >
              <div
                className={cx(
                  "pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br opacity-70",
                  CARD_GRADIENTS[index % CARD_GRADIENTS.length]
                )}
              />
              <div className="relative">
                {card.tag && (
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/70">
                    {card.tag}
                  </p>
                )}
                <h3 className="mt-3 text-2xl font-semibold text-white">{card.title}</h3>
                {card.description && <p className="mt-3 text-white/70">{card.description}</p>}
                {card.media && (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                    <Image src={card.media} alt={card.title} width={400} height={240} className="h-48 w-full object-cover" />
                  </div>
                )}
              </div>
              <div className="relative mt-6 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/60">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20">
                  {index + 1}
                </span>
                <span className="text-white/80">Swipe →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function AccordionSection(section: Extract<Section, { type: "accordion" }>) {
  return (
    <SectionShell id={section.id} title={section.title}>
      <div className="space-y-4">
        {section.items.map((item, index) => (
          <details
            key={item.title}
            className="rounded-2xl border border-slate-100 bg-white p-5 text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
            data-animate-child
            style={getStaggerStyle(index)}
          >
            <summary className="cursor-pointer text-lg font-semibold text-slate-900">{item.title}</summary>
            <p className="mt-3 text-slate-600">{item.description}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

function CardsGridSection(section: Extract<Section, { type: "cards-grid" }>) {
  return (
    <SectionShell id={section.id} title={section.title} contentClassName="mt-10">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {section.cards.map((card, index) => (
          <div
            key={card.title}
            className="relative overflow-hidden rounded-3xl border border-slate-100/60 bg-white/80 p-6 text-slate-900 shadow-[0_25px_60px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 hover:shadow-[0_35px_80px_rgba(15,23,42,0.18)]"
            data-animate-child
            style={getStaggerStyle(index)}
          >
            <div
              className={cx(
                "pointer-events-none absolute inset-0 opacity-80 bg-gradient-to-br",
                CARD_GRADIENTS[index % CARD_GRADIENTS.length]
              )}
              aria-hidden
            />
            <div className="relative">
              {card.icon && (
                <div className="mb-4 inline-flex rounded-full border border-white/40 bg-white/60 p-3 shadow-inner">
                  <Image src={`/${card.icon}.svg`} alt="icon" width={28} height={28} />
                </div>
              )}
              <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
              {card.description && <p className="mt-2 text-slate-600">{card.description}</p>}
              <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-700/70">
                Explore
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-900/20">
                  ↗
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function MediaStripSection(section: Extract<Section, { type: "media-strip" }>) {
  const variant = section.variant ?? "strip";
  const isPanels = variant === "panels";
  const isPortraits = variant === "portraits";

  return (
    <SectionShell id={section.id} title={section.title} contentClassName="mt-8">
      <div className="rounded-[36px] border border-slate-900/10 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-800 p-4 shadow-[0_40px_120px_rgba(15,23,42,0.65)]">
        <div
          className={
            isPanels
              ? "grid gap-4 md:grid-cols-2"
              : isPortraits
                ? "flex gap-4 overflow-x-auto pb-3"
                : "grid grid-flow-col auto-cols-[minmax(220px,1fr)] gap-4 overflow-x-auto pb-3"
          }
        >
          {section.items.map((item, index) => (
            <div
              key={item.src}
              className={`group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 text-white shadow-[0_25px_80px_rgba(15,23,42,0.45)] backdrop-blur ${
                isPortraits ? "h-44 w-40 flex-shrink-0" : isPanels ? "h-80" : "h-64"
              }`}
              data-animate-child
              style={{
                ...getStaggerStyle(index),
                animation: isPanels ? "floaty 18s ease-in-out infinite" : undefined,
                animationDelay: isPanels ? `${index * 120}ms` : undefined,
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                <p className="text-sm font-semibold">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function FeatureBannerSection(section: Extract<Section, { type: "feature-banner" }>) {
  return (
    <SectionShell id={section.id} contentClassName="mt-8">
      <div className="relative overflow-hidden rounded-[40px] border border-slate-900/10 bg-white/90 p-8 text-slate-900 shadow-[0_40px_120px_rgba(15,23,42,0.15)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-sky-400" aria-hidden />
        {section.image && (
          <Image
            src={section.image}
            alt={section.title}
            fill
            className="absolute inset-0 -z-10 object-cover opacity-10"
            sizes="1200px"
          />
        )}
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {section.eyebrow && (
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-rose-500/80">{section.eyebrow}</p>
            )}
            <h3 className="mt-4 text-3xl font-semibold sm:text-4xl text-slate-900">{section.title}</h3>
            {section.description && <p className="mt-4 text-slate-600">{section.description}</p>}
            {section.cta && (
              <Link
                href={section.cta.href}
                className="mt-6 inline-flex items-center gap-3 rounded-full border border-slate-900/10 bg-slate-900 px-7 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_20px_40px_rgba(15,23,42,0.25)]"
              >
                {section.cta.label}
                <span className="text-lg">↗</span>
              </Link>
            )}
          </div>
          {section.stats && section.stats.length > 0 && (
            <div className="grid gap-4">
              {section.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-slate-100 bg-white/70 p-5"
                  data-animate-child
                  style={getStaggerStyle(index)}
                >
                  <p className="text-sm uppercase tracking-[0.4em] text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}

function SplitContentSection(section: Extract<Section, { type: "split-content" }>) {
  return (
    <SectionShell id={section.id} title={section.title} eyebrow={section.eyebrow} contentClassName="mt-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white/90 p-6 text-slate-900 shadow-[0_25px_70px_rgba(15,23,42,0.15)]"
          data-animate-child
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-100/70 via-white to-transparent" />
          <div className="relative">
            {section.description && <p className="text-slate-600">{section.description}</p>}
            {section.primaryList && (
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {section.primaryList.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100/60 bg-white/70 p-3"
                    data-animate-child
                    style={getStaggerStyle(index)}
                  >
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[0.65rem] font-semibold text-white">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {section.media && (
          <div
            className="relative h-80 overflow-hidden rounded-3xl border border-slate-900/10 shadow-[0_30px_80px_rgba(15,23,42,0.2)]"
            data-animate-child
            style={{ animation: "floaty 20s ease-in-out infinite" }}
          >
            <Image src={section.media} alt={section.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          </div>
        )}
      </div>
    </SectionShell>
  );
}

function LogosSection(section: Extract<Section, { type: "logos" }>) {
  const marqueeItems = section.logos.concat(section.logos);

  return (
    <SectionShell
      id={section.id}
      className="max-w-none px-0"
      contentClassName="mt-6 px-0"
      titleClassName="text-3xl font-semibold text-slate-900 sm:px-8 lg:px-24"
    >
      <div className="relative w-full bg-gradient-to-r from-white via-white to-white">
        <div className="logos-marquee overflow-hidden py-6 sm:px-8 lg:px-16">
          <div className="logos-track flex items-center gap-10">
            {marqueeItems.map((logo, index) => (
              <div
                key={`${logo.src}-${index}`}
                className="flex h-16 min-w-[200px] flex-none items-center justify-center rounded-2xl bg-white/80 px-6 py-3 shadow-[0_15px_40px_rgba(15,23,42,0.08)]"
              >
                <Image src={logo.src} alt={logo.name} width={160} height={48} className="max-h-10 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function TestimonialsSection(section: Extract<Section, { type: "testimonials" }>) {
  return (
    <SectionShell id={section.id} title={section.title} contentClassName="mt-8">
      <div className="rounded-[40px] border border-slate-900/10 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-900/70 p-6 text-white shadow-[0_40px_120px_rgba(15,23,42,0.65)]">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, index) => (
            <article
              key={item.name}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              data-animate-child
              style={getStaggerStyle(index)}
            >
              <div
                className={cx(
                  "pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br opacity-70",
                  CARD_GRADIENTS[index % CARD_GRADIENTS.length]
                )}
              />
              <div className="relative">
                {item.avatar && (
                  <Image src={item.avatar} alt={item.name} width={56} height={56} className="rounded-full" />
                )}
                <p className="mt-4 text-base text-white/80">“{item.quote}”</p>
                <p className="mt-4 text-sm font-semibold text-white">{item.name}</p>
                {item.program && <p className="text-xs uppercase tracking-[0.35em] text-white/50">{item.program}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function KeyFiguresSection(section: Extract<Section, { type: "key-figures" }>) {
  return (
    <SectionShell id={section.id} title={section.title} eyebrow={section.eyebrow} contentClassName="mt-8">
      <div className="grid gap-5 md:grid-cols-2">
        {section.items.map((item, index) => (
          <details
            key={item.title}
            className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white/90 p-6 text-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
            open={item.defaultOpen}
            data-animate-child
            style={getStaggerStyle(index)}
          >
            <div
              className={cx(
                "pointer-events-none absolute inset-0 rounded-3xl opacity-80 bg-gradient-to-br",
                CARD_GRADIENTS[index % CARD_GRADIENTS.length]
              )}
            />
            <div className="relative">
              <summary className="flex cursor-pointer items-center justify-between gap-4">
                <div>
                  {item.value && <p className="text-4xl font-semibold text-slate-900">{item.value}</p>}
                  <p className="text-lg font-semibold text-slate-900/90">{item.title}</p>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10 bg-white/60 text-slate-900">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm text-slate-700">{item.description}</p>
              {item.media && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-white/60">
                  <Image src={item.media} alt={item.title} width={560} height={320} className="h-48 w-full object-cover" />
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

function PromoBannerSection(section: Extract<Section, { type: "promo-banner" }>) {
  return (
    <SectionShell id={section.id} contentClassName="mt-8">
      <div className="grid gap-6 overflow-hidden rounded-[36px] border border-white/20 bg-gradient-to-r from-rose-500 via-purple-500 to-sky-500 p-6 text-white shadow-[0_40px_120px_rgba(147,51,234,0.4)] lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {section.eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/70">{section.eyebrow}</p>
          )}
          {section.badge && (
            <span className="inline-flex items-center rounded-full border border-white/40 bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
              {section.badge}
            </span>
          )}
          <h3 className="mt-4 text-3xl font-semibold leading-tight text-white">{section.title}</h3>
          {section.description && <p className="mt-3 text-white/80">{section.description}</p>}
          {section.cta && (
            <Link
              href={section.cta.href}
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.35)]"
              data-animate-child
            >
              {section.cta.label}
              <span>↗</span>
            </Link>
          )}
        </div>
        {section.image && (
          <div className="relative h-64 overflow-hidden rounded-3xl border border-white/40" data-animate-child style={{ animation: "floaty 18s ease-in-out infinite" }}>
            <Image src={section.image} alt={section.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        )}
      </div>
    </SectionShell>
  );
}

function NewsGridSection(section: Extract<Section, { type: "news-grid" }>) {
  return (
    <SectionShell id={section.id} title={section.title} contentClassName="mt-8">
      <div className="grid gap-6 rounded-[38px] border border-slate-100 bg-white/90 p-6 shadow-[0_35px_100px_rgba(15,23,42,0.12)] grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.6fr_1fr]">
        <div className="order-2 space-y-4 lg:order-1">
          {section.left.map((card, index) => (
            <Link
              key={card.title}
              href={card.href ?? "#"}
              className="block rounded-3xl border border-slate-100 bg-slate-50/80 p-4 text-slate-900 transition hover:-translate-y-1 hover:border-rose-400"
              data-animate-child
              style={getStaggerStyle(index)}
            >
              {card.image && (
                <div className="mb-3 overflow-hidden rounded-2xl">
                  <Image src={card.image} alt={card.title} width={320} height={200} className="h-40 w-full object-cover" />
                </div>
              )}
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-rose-500/80">
                {card.tag ?? card.date}
              </p>
              <p className="mt-2 font-semibold">{card.title}</p>
            </Link>
          ))}
        </div>
        <Link
          href={section.lead.href ?? "#"}
          className="group order-1 block rounded-[34px] border border-slate-900/5 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800 p-6 text-white shadow-[0_45px_120px_rgba(15,23,42,0.45)] transition hover:-translate-y-1"
          data-animate-child
          style={getStaggerStyle(2)}
        >
          {section.lead.image && (
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={section.lead.image}
                alt={section.lead.title}
                width={640}
                height={380}
                className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/70">
            {section.lead.tag ?? section.lead.date}
          </p>
          <h3 className="mt-2 text-3xl font-semibold">{section.lead.title}</h3>
          {section.lead.description && <p className="mt-3 text-white/75">{section.lead.description}</p>}
        </Link>
        <div className="order-3 space-y-4">
          {section.right.map((card, index) => (
            <Link
              key={card.title}
              href={card.href ?? "#"}
              className="block rounded-3xl border border-slate-100 bg-white/80 p-4 text-slate-900 transition hover:-translate-y-1 hover:border-sky-400"
              data-animate-child
              style={getStaggerStyle(index)}
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-slate-500">{card.tag ?? card.date}</p>
              <p className="mt-2 font-semibold">{card.title}</p>
              {card.description && <p className="mt-2 text-sm text-slate-500">{card.description}</p>}
            </Link>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function NewsSection(section: Extract<Section, { type: "news" }>) {
  return (
    <SectionShell id={section.id} title={section.title} contentClassName="mt-8">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
        <Link
          href={section.featured.href ?? "#"}
          className="group rounded-[34px] border border-slate-900/5 bg-gradient-to-bl from-slate-900 via-slate-900/95 to-slate-800 p-6 text-white shadow-[0_40px_110px_rgba(15,23,42,0.5)]"
          data-animate-child
        >
          {section.featured.image && (
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={section.featured.image}
                alt={section.featured.title}
                width={540}
                height={320}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.45em] text-white/70">Featured</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{section.featured.title}</h3>
          {section.featured.description && <p className="mt-2 text-white/75">{section.featured.description}</p>}
        </Link>
        <div className="rounded-[30px] border border-slate-100 bg-white/90 p-6 text-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.12)]" data-animate-child>
          <ul className="divide-y divide-slate-100">
            {section.stories.map((story, index) => (
              <li key={story.title} className="py-4" data-animate-child style={getStaggerStyle(index)}>
                <p className="text-[0.75rem] uppercase tracking-[0.4em] text-slate-500">{story.date}</p>
                <Link href={story.href ?? "#"} className="text-lg font-semibold text-slate-900 transition hover:text-rose-500">
                  {story.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}

function VirtualTourSection(section: Extract<Section, { type: "virtual-tour" }>) {
  return (
    <SectionShell id={section.id} title={section.title} contentClassName="mt-8">
      <div
        className="overflow-hidden rounded-[36px] border border-slate-900/10 bg-slate-900/90 shadow-[0_40px_110px_rgba(15,23,42,0.6)]"
        data-animate-child
        style={{ animation: "floaty 24s ease-in-out infinite" }}
      >
        {/* <div className="bg-gradient-to-br from-rose-500/30 via-transparent to-sky-500/30 p-3">
          <iframe
            src={section.iframe}
            title="Virtual campus tour"
            width="100%"
            height="480"
            loading="lazy"
            className="w-full rounded-[24px] border border-white/20"
            allowFullScreen
          />
        </div> */}
      </div>
    </SectionShell>
  );
}

function RichTextSection(section: Extract<Section, { type: "richtext" }>) {
  return (
    <SectionShell id={section.id} title={section.title} contentClassName="mt-6">
      <div className="space-y-4 rounded-[30px] border border-slate-100 bg-white/90 p-6 text-slate-600 shadow-[0_25px_80px_rgba(15,23,42,0.1)]">
        {section.body.map((paragraph, index) => (
          <p key={`${section.id}-${index}`} data-animate-child style={getStaggerStyle(index)}>
            {paragraph}
          </p>
        ))}
      </div>
    </SectionShell>
  );
}
