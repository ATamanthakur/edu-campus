import Link from "next/link";

import type { GlobalSettings, Navigation } from "@/types/content";

type FooterProps = {
  navigation: Navigation;
  global: GlobalSettings;
};

export function Footer({ navigation, global }: FooterProps) {
  return (
    <footer className="mt-24 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
          {navigation.footerColumns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}`}>
                    <Link href={link.href} className="text-slate-200/90 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-8 border-t border-white/5 pt-8 text-sm md:grid-cols-2">
          <div>
            <p className="font-semibold text-white">Get in touch</p>
            {global.address && (
              <p className="mt-2 text-slate-400">
                {global.address.line1}, {global.address.city}, {global.address.state} - {global.address.postalCode}
              </p>
            )}
          </div>
          <div>
            <p className="font-semibold text-white">Connect</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {(global.social ?? []).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-wide text-white/80 hover:border-white hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Chandigarh University. All rights reserved.</p>
          <p>Best Private University in Punjab • 2056 indexed public pages • Data-driven Next.js replica.</p>
        </div>
      </div>
    </footer>
  );
}
