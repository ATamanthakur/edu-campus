import { PageBuilder } from "@/components/PageBuilder";
import { getPageContent } from "@/lib/content";

export default function HomePage() {
  const home = getPageContent("home");
  if (!home) {
    throw new Error("Home page content not found in JSON data.");
  }

  return <PageBuilder sections={home.sections} />;
}
