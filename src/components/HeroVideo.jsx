import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Countdown from './Countdown';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

export default function HeroVideo() {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const clipEnd = weddingConfig.media.heroVideoClipEndSeconds;
  const assetUrl = (path) => (path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path);
  const heroVideo = assetUrl(weddingConfig.media.heroVideo);
  const heroPoster = assetUrl(weddingConfig.media.heroPoster);

  const restartClip = () => {
    if (!videoRef.current || !clipEnd) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  };

  const keepClipShort = () => {
    if (!videoRef.current || !clipEnd) return;
    if (videoRef.current.currentTime >= clipEnd) restartClip();
  };

  return (
    <section className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-charcoal text-ivory">
      <img src={heroPoster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        onLoadedMetadata={restartClip}
        onTimeUpdate={keepClipShort}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-charcoal/75" />
      <div className="relative mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.36em] text-ivory/85">{t('common.gettingMarried')}</p>
        <h1 className="max-w-4xl font-serif text-7xl leading-[0.88] sm:text-8xl lg:text-9xl">{t('common.names')}</h1>
        <p className="mt-7 text-lg uppercase tracking-[0.22em] text-ivory/85">{t('common.date')}</p>
        <p className="mt-3 text-base uppercase tracking-[0.16em] text-ivory/75">{t('common.place')}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="bg-ivory px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal transition hover:bg-beige" to="/schedule">
            {t('common.viewWeekend')}
          </Link>
          <Link className="border border-ivory/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-ivory transition hover:bg-ivory hover:text-charcoal" to="/rsvp">
            {t('common.rsvp')}
          </Link>
        </div>
        <div className="mt-10 max-w-2xl">
          <Countdown />
        </div>
      </div>
    </section>
  );
}
