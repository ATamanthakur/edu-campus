'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";

import type { HeaderIcon, Navigation, NavigationLink } from "@/types/content";

type HeaderProps = {
  navigation: Navigation;
};

const ICONS: Record<HeaderIcon, JSX.Element> = {
  phone: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6.5 3.5 9 3l2 5-2 2a11 11 0 0 0 5 5l2-2 5 2v2.5a2 2 0 0 1-2.2 2 17 17 0 0 1-15.3-15.3 2 2 0 0 1 2-2.2Z" />
    </svg>
  ),
  whatsapp: (
    <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
      <path d="M16.04 5A10.8 10.8 0 0 0 5.21 15.85c0 1.84.5 3.64 1.47 5.21L5 27l6.16-1.58a11 11 0 0 0 4.88 1.18h.02A10.8 10.8 0 0 0 27 15.85 10.84 10.84 0 0 0 16.04 5Zm6.46 15.42c-.3.85-1.74 1.63-2.4 1.68-.61.06-1.37.08-2.22-.14a19.5 19.5 0 0 1-3.45-1.38 17.9 17.9 0 0 1-5.4-5.08c-1.43-1.9-1.9-3.4-2.12-3.94-.22-.54-.02-1.2.4-1.48.41-.27.93-.7 1.48-.7.18 0 .34 0 .49.02.4.02.62.04.9.7.34.82 1.16 2.84 1.26 3.04.1.2.17.44.03.71-.12.26-.2.42-.4.64-.2.22-.42.48-.18.94.24.46 1.06 1.74 2.27 2.82 1.56 1.38 2.86 1.8 3.32 2 .46.2.72.16 1-.1.28-.26 1.16-1.36 1.48-1.82.32-.46.64-.38 1.08-.22.44.16 2.78 1.31 3.25 1.54.48.24.8.36.92.56.12.2.12 1.14-.18 1.98Z" />
    </svg>
  ),
  download: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 4v11m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 20h14" strokeLinecap="round" />
    </svg>
  ),
  play: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="m7 4 13 8-13 8z" />
    </svg>
  ),
  map: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2v16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 3v16m6-14v16" strokeLinecap="round" />
    </svg>
  ),
  search: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
    </svg>
  ),
  facebook: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15 8h-2c-.4 0-1 .2-1 1v2h3l-.4 3H12v8H8v-8H6v-3h2V8.6C8 6 9.5 4 12.6 4H15v4Z" />
    </svg>
  ),
  instagram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.25" />
      <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 8.3s-.2-1.5-.8-2.1c-.8-.9-1.7-.9-2.1-1C16.7 5 12 5 12 5h-.1s-4.7 0-7.1.2c-.4 0-1.3.1-2.1 1-.6.6-.8 2.1-.8 2.1S2 10.1 2 11.9v1.2c0 1.8.2 3.6.2 3.6s.2 1.5.8 2.1c.8.9 1.9.8 2.4.9 1.7.2 7 .2 7 .2s4.7 0 7.1-.2c.4 0 1.3-.1 2.1-1 .6-.6.8-2.1.8-2.1s.2-1.8.2-3.6v-1.2c0-1.8-.2-3.6-.2-3.6ZM10 14.7V8.8l5.3 3z" />
    </svg>
  ),
  linkedin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.5 8.2V20H2V8.2h3.5ZM3.7 4c1.1 0 2 .9 2 2s-.9 2-2 2a2 2 0 1 1 0-4Zm6 4.2V20H6.2V8.2h3.5Zm0 3.6c.8-1.2 2.2-2 3.8-2 2.8 0 5 2 5 5.9V20H15V15c0-1.2-.4-2-1.7-2-1.6 0-2.3 1.1-2.3 2.8V20H7.5v-8.2h2.2Z" />
    </svg>
  ),
  external: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 17 17 7" strokeLinecap="round" />
      <path d="M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

type MegaMenuLink = NavigationLink & { description?: string };
type MegaMenuColumn = { title: string; links: MegaMenuLink[] };
type MegaMenuHighlight = {
  badge?: string;
  title: string;
  description: string;
  stats?: string[];
  image?: string;
  href?: string;
  ctaLabel?: string;
};
type MegaMenuConfig = {
  columns: MegaMenuColumn[];
  highlight?: MegaMenuHighlight;
};

const SUB_COLLEGES = [
  { name: "Shivalik College of Engineering", href: "https://shivalikcollege.edu.in/course/shivalik-college-of-engineering/" },
  { name: "Shivalik College of Pharmacy", href: "https://shivalikcollege.edu.in/course/shivalik-college-of-pharmacy/" },
];

const SECONDARY_LINKS: NavigationLink[] = [
  { label: "Colleges", href: "https://shivalikcollege.edu.in/" },
  { label: "Admission Enquiry", href: "" },
  { label: "Student Services", href: "" },
  { label: "Library", href: "" },
  { label: "Alumni", href: "" },
  { label: "ERP", href: "" },
];

const admissionsMenu: MegaMenuConfig = {
  columns: [
    {
      title: "Plan Your Application",
      links: [
        { label: "SCE 2026", href: "", description: "Apply for scholarships & admissions" },
        { label: "How to Apply", href: "", description: "Step-by-step guide" },
        { label: "SCE Edge", href: "", description: "Exclusive early benefits" },
        { label: "Education Loan", href: "" },
      ],
    },
    {
      title: "Explore Programs",
      links: [
        { label: "Undergraduate", href: "/courses/b-tech-computer-science" },
        { label: "Postgraduate", href: "/departments/management" },
        { label: "Doctoral", href: "" },
        { label: "Lateral Entry", href: "" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Scholarships", href: "", description: "Merit & need based" },
        { label: "International Admissions", href: "" },
        { label: "Helpline", href: "tel:+9997155111", description: "999-7155-111" },
        { label: "Chat with Us", href: "" },
      ],
    },
  ],
  highlight: {
    badge: "Admissions 2026",
    title: "Early applicants unlock premium scholarships",
    description: "Book your preferred SCE slot and secure additional mentoring hours with the admissions team.",
    stats: ["Up to 100% scholarships", "All-India test centers"],
    image: "",
    href: "",
    ctaLabel: "Start Application",
  },
};

const MEGA_MENU_CONFIG: Record<string, MegaMenuConfig> = {
  About: {
    columns: [
      {
        title: "Who We Are",
        links: [
          { label: "Overview", href: "/about" },
          { label: "Vision & Mission", href: "" },
          { label: "Leadership", href: "" },
          { label: "Core Values", href: "" },
        ],
      },
      {
        title: "Rankings & Accreditations",
        links: [
          { label: "QS World Ranking", href: "" },
          { label: "NAAC A+", href: "" },
          { label: "ABET Accreditation", href: "" },
          { label: "Awards", href: "" },
        ],
      },
      {
        title: "Campus Essentials",
        links: [
          { label: "Institutes & Departments", href: "" },
          { label: "Governance", href: "" },
          { label: "SCE Edge", href: "" },
          { label: "Corporate Brochure", href: "" },
        ],
      },
    ],
    highlight: {
      badge: "Ranked #1 Private",
      title: "QS Asia University Rankings 2026",
      description: "Among India’s top-ranked private College with NAAC A+ (3.28) and 4k+ Successful Alumni",
      stats: ["801-850 QS World", "Top 170 Asia"],
      image: "",
      href: "/about",
      ctaLabel: "Discover SCE",
    },
  },
  Admissions: admissionsMenu,
  Apply: admissionsMenu,
  "Campus Life": {
    columns: [
      {
        title: "Live on Campus",
        links: [
          { label: "Hostels", href: "https://hostel.shivalikcollege.edu.in/" },
          { label: "Dining", href: "/campus-life" },
          { label: "Transport", href: "" },
          { label: "Sports", href: "" },
        ],
      },
      {
        title: "Experience",
        links: [
          { label: "Clubs & Chapters", href: "" },
          { label: "Cultural Activities", href: "" },
          { label: "Student Welfare", href: "" },
        ],
      },
    ],
    highlight: {
      badge: "65+ Countries",
      title: "Immersive residential experience",
      description: "Live, learn, and collaborate with peers from every Indian state and 65+ nations in a tech-enabled campus.",
      stats: ["250+ clubs & chapters", "24x7 smart hostels"],
      image: "",
      href: "/campus-life",
      ctaLabel: "Explore Campus",
    },
  },
  Courses: {
    columns: [
      {
        title: "Popular Disciplines",
        links: [
          { label: "Engineering", href: "/courses/b-tech-computer-science" },
          { label: "Management", href: "/departments/management" },
          { label: "Sciences", href: "/departments/sciences" },
          { label: "Liberal Arts", href: "/departments/liberal-arts" },
        ],
      },
      {
        title: "Quick Links",
        links: [
          { label: "Program Search", href: "" },
          { label: "Distance Learning", href: "/departments/distance-education" },
          { label: "Credit Transfer", href: "" },
          { label: "Download Prospectus", href: "" },
        ],
      },
    ],
    highlight: {
      badge: "140+ Programs",
      title: "Future-ready curriculum",
      description: "Project-based learning powered by industry mentors, global faculty, and labs co-built with Fortune 500 companies.",
      stats: ["30+ international pathways", "Industry 4.0 labs"],
      image: "",
      href: "/courses/b-tech-computer-science",
      ctaLabel: "Browse Courses",
    },
  },
  Departments: {
    columns: [
      {
        title: "Centers of Excellence",
        links: [
          { label: "Engineering", href: "/departments/engineering" },
          { label: "Pharmaceutical Sciences", href: "/departments/pharma" },
          { label: "Design & Media", href: "/departments/design" },
          { label: "Law", href: "/departments/law" },
        ],
      },
      {
        title: "Academic Support",
        links: [
          { label: "Teaching Practices", href: "" },
          { label: "System of Evaluation", href: "" },
          { label: "Industry Advisory Boards", href: "" },
          { label: "Research Clusters", href: "/research" },
        ],
      },
    ],
    highlight: {
      badge: "18 Schools",
      title: "Multi-disciplinary ecosystem",
      description: "140+ programs backed by 1350+ doctoral faculty, 30+ centers of excellence, and 250+ global collaborations.",
      stats: ["1350+ doctoral faculty", "1,00,000+ alumni"],
      image: "",
      href: "/departments/engineering",
      ctaLabel: "View Departments",
    },
  },
  Placements: {
    columns: [
      {
        title: "Career Outcomes",
        links: [
          { label: "Placement Overview", href: "" },
          { label: "Dream Packages", href: "" },
          { label: "Recruiting Partners", href: "" },
        ],
      },
      {
        title: "Learner Support",
        links: [
          { label: "Career Mentorship", href: "" },
          { label: "Entrepreneurship", href: "" },
          { label: "Global Internships", href: "" },
        ],
      },
    ],
    highlight: {
      badge: "9000+ Offers",
      title: "India's best Placements College",
      description: "Dream + super dream packages from 1100+ companies including Google, Amazon, Microsoft, and Fortune 500 leaders.",
      stats: ["54.75 LPA national", "1.7 Cr international"],
      image: "",
      href: "/placements",
      ctaLabel: "View Placements",
    },
  },
  Research: {
    columns: [
      {
        title: "Innovation Programs",
        links: [
          { label: "Research Clusters", href: "" },
          { label: "Patents", href: "" },
          { label: "Centers of Excellence", href: "" },
        ],
      },
      {
        title: "Get Involved",
        links: [
          { label: "PhD Programs", href: "" },
          { label: "Industry Collaborations", href: "" },
          { label: "Funding & Grants", href: "" },
        ],
      },
    ],
    highlight: {
      badge: "5000+ Publications",
      title: "Research & Innovation",
      description: "Engage with global labs, international research partners, and interdisciplinary problem statements.",
      stats: ["30+ excellence centers", "250+ collaborations"],
      image: "",
      href: "/research",
      ctaLabel: "Explore Research",
    },
  },
  International: {
    columns: [
      {
        title: "Global Exposure",
        links: [
          { label: "International Admissions", href: "" },
          { label: "Study Abroad", href: "" },
          { label: "Dual Degrees", href: "" },
        ],
      },
      {
        title: "Network",
        links: [
          { label: "Global Partners", href: "" },
          { label: "International Research", href: "" },
          { label: "Language & Culture", href: "" },
        ],
      },
    ],
    highlight: {
      badge: "515+ Partners",
      title: "Global mobility pathways",
      description: "Leverage tie-ups across USA, Europe, Asia, and Australia via semester abroad, dual degrees, and internships.",
      stats: ["Students from 65 nations", "Joint research with 250+ institutions"],
      image: "",
      href: "/international",
      ctaLabel: "See Partnerships",
    },
  },
  "News & Events": {
    columns: [
      {
        title: "Stay Updated",
        links: [
          { label: "Latest News", href: "" },
          { label: "Events Calendar", href: "" },
          { label: "Press Releases", href: "" },
        ],
      },
      {
        title: "Highlights",
        links: [
          { label: "Campus Tank", href: "" },
          { label: "Global Summits", href: "" },
          { label: "Awards & Achievements", href: "" },
        ],
      },
    ],
    highlight: {
      badge: "Daily Stories",
      title: "SCE in the spotlight",
      description: "Browse student wins, global collaborations, and marquee conferences hosted on campus all year round.",
      stats: ["50+ events monthly"],
      image: "",
      href: "/news-events",
      ctaLabel: "Read Updates",
    },
  },
};

function HeaderIcon({ name }: { name?: HeaderIcon }) {
  if (!name) return null;
  return ICONS[name];
}

export function Header({ navigation }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isCollegesDropdownOpen, setIsCollegesDropdownOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const collegesHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const announcements = navigation.topBar?.announcements ?? [];
  const contacts = navigation.topBar?.contacts ?? navigation.utility;
  const socials = navigation.topBar?.socials ?? [];
  const quickActions = navigation.quickActions ?? [];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 64);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setIsMenuOpen(false);
        setIsCollegesDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (collegesHoverTimeoutRef.current) {
        clearTimeout(collegesHoverTimeoutRef.current);
      }
    };
  }, []);

  const scheduleMenuClose = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      hoverTimeoutRef.current = null;
    }, 120);
  };

  const cancelMenuClose = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const isMegaActive = Boolean(activeMenu);
  const overlayVisible = isMenuOpen || isMegaActive;
  const navIsLight = isScrolled;
  const megaPanelIsLight = navIsLight || isMegaActive;
  const navWrapperClass = navIsLight
    ? "bg-white/95 text-slate-900 backdrop-blur-xl border-b border-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.15)]"
    : "bg-transparent text-white border-b border-white/10";
  const navLinkClass = navIsLight ? "text-slate-900" : "text-white";
  const quickActionClass = navIsLight
    ? "border-slate-200/80 text-slate-900 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
    : "border-white/30 text-white hover:border-white hover:bg-white/10";
  const iconButtonClass = navIsLight
    ? "border-slate-200/80 text-slate-900 hover:bg-slate-900 hover:text-white"
    : "border-white/30 text-white hover:bg-white/10";
  const logoSrc = navIsLight ? navigation.logo.dark : navigation.logo.light;
  const megaMenu = activeMenu ? MEGA_MENU_CONFIG[activeMenu] : undefined;

  return (
    <>
      <div
        aria-hidden
        className={`fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          overlayVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <header className="sticky top-0 z-40 w-full transition-shadow">
        {/* {announcements.length > 0 && (
          <div className="bg-slate-950/95 text-white">
            <div className="mx-auto flex flex-col gap-2 px-4 py-2 text-[0.7rem] uppercase tracking-[0.25em] md:flex-row md:items-center md:gap-6">
              <div className="ticker-mask w-full overflow-hidden">
                <div className="marquee-track flex gap-8 text-white/70">
                  {announcements.concat(announcements).map((item, index) => (
                    <span key={`${item}-${index}`} className="inline-flex items-center gap-3 whitespace-nowrap">
                      <span className="h-1 w-1 rounded-full bg-rose-500" aria-hidden />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[0.65rem] tracking-[0.15em] text-white/70">
                {contacts?.map((contact, index) => (
                  <Link
                    key={`${contact.href}-${index}`}
                    href={contact.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-white/40"
                  >
                    <HeaderIcon name={contact.icon} />
                    {contact.label}
                  </Link>
                ))}
                {socials.length > 0 && (
                  <span className="hidden items-center gap-2 md:flex">
                    {socials.map((social, index) => (
                      <Link key={`${social.href}-${index}`} href={social.href} aria-label={social.label} className="rounded-full border border-white/10 p-1.5 text-white/80 transition hover:border-white/60">
                        <HeaderIcon name={social.icon} />
                      </Link>
                    ))}
                  </span>
                )}
              </div>
            </div>
          </div>
        )} */}
        <div className={`${navWrapperClass} supports-[backdrop-filter]:backdrop-blur`}>
          <div className="mx-auto w-full px-4">
            <div className="hidden items-center justify-between gap-6 border-b border-white/10 py-3 text-[0.65rem] uppercase tracking-[0.35em] lg:flex">
              {socials.length > 0 && (
                <div className="flex items-center gap-8 font-semibold">
                  {socials.map((social, index) => (
                    <Link
                      key={`${social.href}-${index}`}
                      href={social.href}
                      aria-label={social.label}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-current/20 text-current transition hover:border-current hover:text-rose-500"
                    >
                      <HeaderIcon name={social.icon} />
                    </Link>
                  ))}
                </div>
              )}

              <div className="flex flex-1 items-center justify-center gap-4 text-[0.6rem] font-semibold">
                {SECONDARY_LINKS.map((link, index) => {
                  if (link.label === "Colleges") {
                    return (
                      <div
                        key={`${link.href}-${index}`}
                        className="relative"
                        onMouseEnter={() => {
                          if (collegesHoverTimeoutRef.current) clearTimeout(collegesHoverTimeoutRef.current);
                          setIsCollegesDropdownOpen(true);
                        }}
                        onMouseLeave={() => {
                          collegesHoverTimeoutRef.current = setTimeout(() => {
                            setIsCollegesDropdownOpen(false);
                          }, 150);
                        }}
                      >
                        <Link href={link.href} className="text-current transition hover:text-rose-500 inline-flex items-center gap-1">
                          {link.label}
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`transition-transform ${isCollegesDropdownOpen ? "rotate-180" : "rotate-0"}`}
                          >
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" />
                          </svg>
                        </Link>
                        {isCollegesDropdownOpen && (
                          <div
                            className={`absolute left-0 top-full mt-2 w-64 rounded-2xl border shadow-2xl z-50 ${
                              navIsLight ? "bg-white border-slate-200" : "bg-slate-900 border-white/10"
                            }`}
                            onMouseEnter={() => {
                              if (collegesHoverTimeoutRef.current) clearTimeout(collegesHoverTimeoutRef.current);
                            }}
                            onMouseLeave={() => {
                              collegesHoverTimeoutRef.current = setTimeout(() => {
                                setIsCollegesDropdownOpen(false);
                              }, 150);
                            }}
                          >
                            <div className="p-2">
                              {SUB_COLLEGES.map((college) => (
                                <Link
                                  key={college.href}
                                  href={college.href}
                                  className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                    navIsLight
                                      ? "text-slate-900 hover:bg-rose-50 hover:text-rose-600"
                                      : "text-white hover:bg-white/10"
                                  }`}
                                >
                                  {college.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <Link key={`${link.href}-${index}`} href={link.href} className="text-current transition hover:text-rose-500">
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 text-[0.6rem] font-semibold">
                <button type="button" aria-label="Search" className={`rounded-full border px-3 py-2 ${iconButtonClass}`}>
                  <HeaderIcon name="search" />
                </button>
                <Link
                  href="tel:+9997155111"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm tracking-[0.25em]"
                >
                  <HeaderIcon name="phone" />
                  999 7155 111
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center gap-4 py-4">
                <Link href="/" className="flex items-center gap-3">
                  <Image
                    src={logoSrc}
                    alt="Shivalik College of Engineering"
                    width={190}
                    height={54}
                    className="drop-shadow"
                  />
                </Link>
                <nav
                  className={`hidden flex-1 items-center justify-center gap-6 text-sm font-semibold lg:flex ${navLinkClass}`}
                  onMouseEnter={cancelMenuClose}
                  onMouseLeave={scheduleMenuClose}
                >
                  {navigation.primary.map((item, index) => {
                    const hasMega = Boolean(MEGA_MENU_CONFIG[item.label]);
                    const isActive = activeMenu === item.label;
                    return (
                      <div key={`${item.href}-${index}`} className="relative">
                        <Link
                          href={item.href}
                          className={`group inline-flex items-center gap-1 pb-1 transition ${
                            isActive ? "text-rose-600" : navIsLight ? "hover:text-rose-600" : "hover:text-rose-200"
                          }`}
                          onMouseEnter={() => (hasMega ? setActiveMenu(item.label) : setActiveMenu(null))}
                          onFocus={() => hasMega && setActiveMenu(item.label)}
                        >
                          {item.label}
                          {hasMega && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className={`transition-transform ${isActive ? "rotate-180" : "rotate-0"}`}
                            >
                              <path d="M6 9l6 6 6-6" strokeLinecap="round" />
                            </svg>
                          )}
                          <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-rose-500 to-orange-400 transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>
                      </div>
                    );
                  })}
                </nav>
                <div className="ml-auto hidden items-center gap-3 lg:flex">
                  {quickActions.map((action, index) => (
                    <Link
                      key={`${action.href}-${index}`}
                      href={action.href}
                      className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition ${quickActionClass}`}
                    >
                      <span className={`transition group-hover:text-white ${navIsLight ? "text-slate-500" : "text-white/70"}`}>
                        <HeaderIcon name={action.icon ?? "external"} />
                      </span>
                      {action.label}
                    </Link>
                  ))}
                  <Link
                    href={navigation.cta.href}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 px-6 py-2 text-sm font-semibold text-white shadow-[0_25px_60px_rgba(248,113,113,0.45)] transition hover:opacity-90"
                  >
                    {navigation.cta.label}
                  </Link>
                </div>
                <div className="ml-auto flex items-center gap-3 lg:hidden">
                  <button type="button" aria-label="Search" className={`rounded-full p-2 transition ${iconButtonClass}`}>
                    <HeaderIcon name="search" />
                  </button>
                  <button
                    type="button"
                    aria-label="Toggle navigation"
                    className={`rounded-full p-2 transition ${iconButtonClass}`}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d={isMenuOpen ? "M4 4l12 12M16 4 4 16" : "M3 6h18M3 12h18M3 18h18"} strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
              {megaMenu && (
                <div
                  className="pointer-events-none absolute left-1/2 top-full hidden w-full -translate-x-1/2 pt-4 lg:block z-40"
                  onMouseEnter={cancelMenuClose}
                  onMouseLeave={scheduleMenuClose}
                >
                  <div
                    className={`pointer-events-auto mx-auto w-[min(75rem,calc(100vw-2rem))] rounded-3xl border ${megaPanelIsLight ? "border-slate-200/70 bg-white text-slate-900" : "border-white/10 bg-slate-950/95 text-white"} px-6 py-8 shadow-2xl z-40`}
                  >
                    <div className="grid gap-10 lg:grid-cols-12">
                      <div className="lg:col-span-8 grid gap-6 sm:grid-cols-2">
                        {megaMenu.columns.map((column) => (
                          <div key={column.title}>
                            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-500">{column.title}</p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-600">
                              {column.links.map((link) => (
                                <li key={`${column.title}-${link.label}`}>
                                  <Link
                                    href={link.href}
                                    className="group flex flex-col rounded-xl px-3 py-2 transition hover:bg-rose-50/70 lg:hover:translate-x-1"
                                  >
                                    <span className="font-semibold text-slate-900 group-hover:text-rose-600">
                                      {link.label}
                                    </span>
                                    {link.description && (
                                      <span className="text-xs text-slate-500">{link.description}</span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {megaMenu.highlight && (
                        <div className="relative min-h-[18rem] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900 p-6 text-white lg:col-span-4">
                          {megaMenu.highlight.image && (
                            <Image
                              src={megaMenu.highlight.image}
                              alt={megaMenu.highlight.title}
                              fill
                              sizes="400px"
                              className="absolute inset-0 object-cover opacity-30"
                            />
                          )}
                          <div className="relative flex h-full flex-col gap-4">
                            {megaMenu.highlight.badge && (
                              <span className="inline-flex w-fit items-center rounded-full border border-white/30 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em]">
                                {megaMenu.highlight.badge}
                              </span>
                            )}
                            <p className="text-2xl font-semibold leading-tight">{megaMenu.highlight.title}</p>
                            <p className="text-sm text-white/80">{megaMenu.highlight.description}</p>
                            {megaMenu.highlight.stats && (
                              <ul className="space-y-1 text-sm text-white/80">
                                {megaMenu.highlight.stats.map((stat) => (
                                  <li key={stat} className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                                    {stat}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {megaMenu.highlight.href && (
                              <Link
                                href={megaMenu.highlight.href}
                                className="mt-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                              >
                                {megaMenu.highlight.ctaLabel ?? "Learn more"}
                                <HeaderIcon name="external" />
                              </Link>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {isMenuOpen && (
            <div className="border-t border-slate-200/60 bg-white/95 px-4 py-6 text-slate-900 shadow-2xl dark:border-white/10 dark:bg-slate-900/90 dark:text-white lg:hidden">
              <div className="mt-6 flex flex-wrap gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.3em]">
                {SECONDARY_LINKS.map((link, index) => (
                  <Link key={`${link.href}-${index}`} href={link.href} className="rounded-full border border-slate-200/70 px-3 py-1">
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {navigation.primary.map((item, index) => {
                  const config = MEGA_MENU_CONFIG[item.label];
                  const isExpanded = mobileExpanded === item.label;
                  return (
                    <div key={`${item.href}-${index}`} className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/15">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between text-left text-base font-semibold"
                        onClick={() => (config ? setMobileExpanded(isExpanded ? null : item.label) : setIsMenuOpen(false))}
                      >
                        <span>{item.label}</span>
                        {config ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className={`transition-transform ${isExpanded ? "rotate-180" : "rotate-0"}`}
                          >
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" />
                          </svg>
                        ) : (
                          <HeaderIcon name="external" />
                        )}
                      </button>
                      {config ? (
                        <div className={`grid gap-4 text-sm transition-all ${isExpanded ? "mt-4 max-h-screen opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
                          {config.columns.map((column) => (
                            <div key={`${item.label}-${column.title}`}>
                              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-500">{column.title}</p>
                              <ul className="mt-2 space-y-2">
                                {column.links.map((link) => (
                                  <li key={`${column.title}-${link.label}`}>
                                    <Link href={link.href} className="block rounded-xl bg-white/40 px-3 py-2 dark:bg-white/5" onClick={() => setIsMenuOpen(false)}>
                                      <span className="font-semibold">{link.label}</span>
                                      {link.description && <span className="block text-xs text-slate-500">{link.description}</span>}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          {config.highlight && (
                            <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900 p-4 text-white">
                              {config.highlight.badge && (
                                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/70">{config.highlight.badge}</p>
                              )}
                              <p className="mt-2 text-lg font-semibold">{config.highlight.title}</p>
                              <p className="text-sm text-white/80">{config.highlight.description}</p>
                              {config.highlight.href && (
                                <Link
                                  href={config.highlight.href}
                                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {config.highlight.ctaLabel ?? "Learn more"}
                                  <HeaderIcon name="external" />
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link href={item.href} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold" onClick={() => setIsMenuOpen(false)}>
                          Visit {item.label}
                          <HeaderIcon name="external" />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={`${action.href}-${index}`}
                    href={action.href}
                    className="inline-flex items-center justify-between rounded-2xl border border-slate-200/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] dark:border-white/20"
                  >
                    <span>{action.label}</span>
                    <HeaderIcon name={action.icon ?? "external"} />
                  </Link>
                ))}
                <Link
                  href={navigation.cta.href}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 px-4 py-3 text-sm font-semibold text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navigation.cta.label}
                </Link>
              </div>
              {contacts && contacts.length > 0 && (
                <div className="mt-6 space-y-2 border-t border-slate-200/60 pt-4 text-xs uppercase tracking-[0.3em] text-slate-500 dark:border-white/10">
                  {contacts.map((contact, index) => (
                    <Link key={`${contact.href}-${index}`} href={contact.href} className="flex items-center gap-3">
                      <HeaderIcon name={contact.icon} />
                      {contact.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
