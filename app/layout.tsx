import Image from "next/image";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NotificationBar } from "@/components/NotificationBar";
import { TimerBanner } from "@/components/TimerBanner";
import { getGlobalSettings, getNavigation } from "@/lib/content";

import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Shivalik College - Best Private College in Uttarakhand",
  description:
    "A Next.js + Tailwind CSS replica of https://www.cuchd.in powered entirely by JSON-authored content blocks.",
  metadataBase: new URL("https://www.cuchd.in"),
  openGraph: {
    title: "Shivalik College",
    description: "Best Private University in Punjab with 2056 indexed public pages.",
    url: "https://www.cuchd.in",
    siteName: "Shivalik College",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = getNavigation();
  const global = getGlobalSettings();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[var(--background)] text-[var(--foreground)]`}>
        <div className="relative min-h-screen">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] md:h-[900px] lg:h-[1020px] overflow-hidden"
          >
            <Image
              src="https://www.cuchd.in/latest-assets/img/banner-2025.webp"
              alt="CU campus banner backdrop"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/20 to-transparent" />
          </div>
          <Header navigation={navigation} />
          <NotificationBar data={global.notification} />
          <main className="relative z-10 min-h-screen pb-24">{children}</main>
          <Footer navigation={navigation} global={global} />
          <TimerBanner data={global.timer} />
        </div>
      </body>
    </html>
  );
}
