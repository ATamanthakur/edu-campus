export type CTA = {
  label: string;
  href: string;
  style?: "primary" | "secondary";
};

export type SectionId = string;

export type HeroLeadFormField = {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
};

export type HeroLeadForm = {
  title: string;
  description?: string;
  action?: string;
  fields: HeroLeadFormField[];
  cta: CTA;
  disclaimer?: string;
};

export type HeroSection = {
  id: SectionId;
  type: "hero";
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
  badges?: Array<{ label: string; value: string }>;
  gallery?: Array<{ src: string; alt: string }>;
  metrics?: Array<{ label: string; value: string }>;
  ctas?: CTA[];
  leadForm?: HeroLeadForm;
};

export type TickerSection = {
  id: SectionId;
  type: "ticker";
  items: string[];
};

export type CTAPanelSection = {
  id: SectionId;
  type: "cta-panel";
  title: string;
  description?: string;
  ctas?: CTA[];
};

export type StatsSection = {
  id: SectionId;
  type: "stats";
  title?: string;
  items: Array<{ label: string; value: string; suffix?: string }>;
};

export type CarouselSection = {
  id: SectionId;
  type: "carousel";
  title?: string;
  cards: Array<{
    title: string;
    description?: string;
    tag?: string;
    media?: string;
  }>;
};

export type AccordionSection = {
  id: SectionId;
  type: "accordion";
  title?: string;
  items: Array<{ title: string; description: string }>;
};

export type CardsGridSection = {
  id: SectionId;
  type: "cards-grid";
  title?: string;
  cards: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;
};

export type KeyFiguresSection = {
  id: SectionId;
  type: "key-figures";
  title?: string;
  eyebrow?: string;
  items: Array<{
    title: string;
    value?: string;
    description: string;
    media?: string;
    defaultOpen?: boolean;
  }>;
};

export type MediaStripSection = {
  id: SectionId;
  type: "media-strip";
  title?: string;
  variant?: "panels" | "strip" | "portraits";
  items: Array<{ src: string; alt: string }>;
};

export type FeatureBannerSection = {
  id: SectionId;
  type: "feature-banner";
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  stats?: Array<{ label: string; value: string }>;
  cta?: CTA;
};

export type SplitContentSection = {
  id: SectionId;
  type: "split-content";
  eyebrow?: string;
  title: string;
  description?: string;
  primaryList?: string[];
  secondaryList?: string[];
  media?: string;
};

export type PromoBannerSection = {
  id: SectionId;
  type: "promo-banner";
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: string;
  image?: string;
  cta?: CTA;
};

export type LogosSection = {
  id: SectionId;
  type: "logos";
  title?: string;
  logos: Array<{ name: string; src: string }>;
};

export type TestimonialsSection = {
  id: SectionId;
  type: "testimonials";
  title?: string;
  items: Array<{
    name: string;
    program?: string;
    quote: string;
    avatar?: string;
  }>;
};

export type NewsSection = {
  id: SectionId;
  type: "news";
  title?: string;
  featured: {
    title: string;
    description?: string;
    image?: string;
    href?: string;
  };
  stories: Array<{
    title: string;
    date?: string;
    href?: string;
  }>;
};

export type NewsGridCard = {
  title: string;
  description?: string;
  date?: string;
  tag?: string;
  href?: string;
  image?: string;
};

export type NewsGridSection = {
  id: SectionId;
  type: "news-grid";
  title?: string;
  lead: NewsGridCard;
  left: NewsGridCard[];
  right: NewsGridCard[];
};

export type VirtualTourSection = {
  id: SectionId;
  type: "virtual-tour";
  title?: string;
  iframe: string;
};

export type RichTextSection = {
  id: SectionId;
  type: "richtext";
  title?: string;
  body: string[];
};

export type Section =
  | HeroSection
  | TickerSection
  | CTAPanelSection
  | StatsSection
  | CarouselSection
  | AccordionSection
  | CardsGridSection
  | KeyFiguresSection
  | MediaStripSection
  | FeatureBannerSection
  | SplitContentSection
  | PromoBannerSection
  | LogosSection
  | TestimonialsSection
  | NewsSection
  | NewsGridSection
  | VirtualTourSection
  | RichTextSection;

export type PageContent = {
  slug: string;
  title: string;
  sections: Section[];
};

export type Course = {
  slug: string;
  title: string;
  overview: string;
  highlights: string[];
  outcomes: string[];
  heroImage?: string;
};

export type Department = {
  slug: string;
  title: string;
  overview: string;
  focusAreas: string[];
  resources: string[];
  heroImage?: string;
};

export type NavigationLink = {
  label: string;
  href: string;
};

export type HeaderIcon =
  | "phone"
  | "whatsapp"
  | "download"
  | "play"
  | "map"
  | "search"
  | "facebook"
  | "instagram"
  | "youtube"
  | "linkedin"
  | "external";

export type NavigationAction = NavigationLink & {
  icon?: HeaderIcon;
};

export type NavigationTopBar = {
  announcements?: string[];
  contacts?: NavigationAction[];
  socials?: NavigationAction[];
};

export type FooterColumn = {
  title: string;
  links: NavigationLink[];
};

export type Navigation = {
  logo: {
    light: string;
    dark: string;
  };
  primary: NavigationLink[];
  utility: NavigationAction[];
  cta: CTA;
  quickActions?: NavigationAction[];
  topBar?: NavigationTopBar;
  footerColumns: FooterColumn[];
};

export type GlobalSettings = {
  notification?: {
    title: string;
    message: string;
    cta?: CTA;
  };
  timer?: {
    label: string;
    deadline: string;
    cta?: CTA;
  };
  social?: NavigationLink[];
  address?: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
  };
};

export type SiteContent = {
  navigation: Navigation;
  global: GlobalSettings;
  pages: PageContent[];
  collections: {
    courses: Course[];
    departments: Department[];
  };
};
