'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import type { GlobalSettings } from '@/types/content';

type TimerBannerProps = {
  data?: GlobalSettings['timer'];
};

type TimeParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const emptyTime: TimeParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getTimeRemaining(deadline: string): TimeParts {
  const target = new Date(deadline).getTime();
  const now = Date.now();
  const difference = Math.max(target - now, 0);

  if (difference <= 0) {
    return emptyTime;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function TimerBanner({ data }: TimerBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [clock, setClock] = useState<TimeParts>(emptyTime);

  const targetDate = useMemo(() => data?.deadline ?? '', [data?.deadline]);

  useEffect(() => {
    if (!targetDate) return;
    const updateClock = () => setClock(getTimeRemaining(targetDate));
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!data || dismissed || !targetDate) {
    return null;
  }

  const isExpired = Object.values(clock).every((value) => value === 0);
  if (isExpired) {
    return null;
  }

  const entries: Array<{ label: keyof TimeParts; value: number }> = [
    { label: 'days', value: clock.days },
    { label: 'hours', value: clock.hours },
    { label: 'minutes', value: clock.minutes },
    { label: 'seconds', value: clock.seconds },
  ];

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-3xl border border-white/10 bg-slate-900/90 p-5 text-white shadow-2xl shadow-black/40 backdrop-blur lg:left-6 lg:right-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-semibold leading-5 text-white/80">{data.label}</p>
          <button
            type="button"
            aria-label="Dismiss timer"
            className="rounded-full border border-white/20 p-1 text-white/70 hover:bg-white/10"
            onClick={() => setDismissed(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center text-xs uppercase tracking-wide text-white/70">
          {entries.map((entry) => (
            <div key={entry.label} className="rounded-2xl border border-white/10 bg-white/5 p-2">
              <div className="text-2xl font-semibold text-white">{entry.value.toString().padStart(2, '0')}</div>
              <div>{entry.label}</div>
            </div>
          ))}
        </div>
        {data.cta && (
          <Link
            href={data.cta.href}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-4 py-2 text-sm font-semibold text-white"
          >
            {data.cta.label}
          </Link>
        )}
      </div>
    </aside>
  );
}
