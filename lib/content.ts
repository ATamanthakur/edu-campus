import siteContent from "@/data/site-content.json";
import type {
  Course,
  Department,
  GlobalSettings,
  Navigation,
  PageContent,
  SiteContent,
} from "@/types/content";

const content = siteContent as SiteContent;

export function getNavigation(): Navigation {
  return content.navigation;
}

export function getGlobalSettings(): GlobalSettings {
  return content.global;
}

export function getPageContent(slug: string): PageContent | undefined {
  return content.pages.find((page) => page.slug === slug);
}

export function getAllPageSlugs(): string[] {
  return content.pages.map((page) => page.slug).filter((slug) => slug !== "home");
}

export function getCourses(): Course[] {
  return content.collections.courses;
}

export function getCourseSlugs(): string[] {
  return getCourses().map((course) => course.slug);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return getCourses().find((course) => course.slug === slug);
}

export function getDepartments(): Department[] {
  return content.collections.departments;
}

export function getDepartmentSlugs(): string[] {
  return getDepartments().map((dept) => dept.slug);
}

export function getDepartmentBySlug(slug: string): Department | undefined {
  return getDepartments().find((dept) => dept.slug === slug);
}

export function getSiteMetadata(): SiteContent {
  return content;
}
