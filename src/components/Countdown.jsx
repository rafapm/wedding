import { useEffect, useState } from 'react';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

function calculate() {
  const difference = new Date(weddingConfig.date).getTime() - Date.now();
  const total = Math.max(difference, 0);
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(calculate);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = window.setInterval(() => setTime(calculate()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 border border-ivory/30 bg-charcoal/25 text-center backdrop-blur-md">
      {Object.entries(time).map(([key, value]) => (
        <div key={key} className="border-r border-ivory/20 p-3 last:border-r-0 sm:p-5">
          <div className="font-serif text-3xl leading-none sm:text-5xl">{value}</div>
          <div className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ivory/75">{t(`common.${key}`)}</div>
        </div>
      ))}
    </div>
  );
}
