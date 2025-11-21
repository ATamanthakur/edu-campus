'use client';

import Link from 'next/link';
import { useState } from 'react';

import type { GlobalSettings } from '@/types/content';

type NotificationBarProps = {
  data?: GlobalSettings['notification'];
};

export function NotificationBar({ data }: NotificationBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!data || dismissed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-700 via-rose-600 to-orange-500 text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 text-sm">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">{data.title}</p>
          <p className="font-semibold">{data.message}</p>
        </div>
        {data.cta && (
          <Link
            href={data.cta.href}
            className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:bg-white/30"
          >
            {data.cta.label}
          </Link>
        )}
        <button
          type="button"
          aria-label="Dismiss notification"
          className="rounded-full border border-white/30 p-1 hover:bg-white/10"
          onClick={() => setDismissed(true)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
