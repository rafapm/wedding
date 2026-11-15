import { useEffect, useRef, useState } from 'react';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

export default function PasswordGate({ children }) {
  const [allowed, setAllowed] = useState(() => localStorage.getItem('jr-access') === 'granted');
  const audio = useRef(null);
  const musicStarted = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { language, t } = useTranslation();
  const coupleName = language === 'az' ? 'Günay & Rafael' : weddingConfig.couple.firstNames;

  const startMusic = () => {
    if (!audio.current) return;
    audio.current.volume = 0.25;
    if (!musicStarted.current) audio.current.currentTime = 117;
    audio.current.play().catch(() => setPlaying(false));
  };

  useEffect(() => {
    if (localStorage.getItem('jr-access') === 'granted' && localStorage.getItem('jr-music') !== 'off') startMusic();
  }, []);

  const toggleMusic = () => {
    if (playing) {
      audio.current.pause();
      localStorage.setItem('jr-music', 'off');
    } else {
      localStorage.setItem('jr-music', 'on');
      startMusic();
    }
  };

  const submit = (event) => {
    event.preventDefault();
    if (password.trim() === weddingConfig.password) {
      localStorage.setItem('jr-access', 'granted');
      if (localStorage.getItem('jr-music') !== 'off') startMusic();
      setAllowed(true);
      return;
    }
    setError(t('gate.error'));
  };

  return <>
    <audio ref={audio} src={`${import.meta.env.BASE_URL}music/la-mentira-instrumental.mp3`} loop preload="none" onPlay={() => { musicStarted.current = true; setPlaying(true); }} onPause={() => setPlaying(false)} onError={() => setPlaying(false)} />
    {allowed ? <>
      {children}
      <button type="button" onClick={toggleMusic} aria-pressed={playing} aria-label={t(`gallery.${playing ? 'pauseMusic' : 'playMusic'}`)} title={t('gallery.musicCopy')} className="fixed bottom-4 right-4 z-[1000] flex items-center gap-2 border border-gold/40 bg-ivory/95 px-4 py-3 text-xs text-charcoal shadow-lg backdrop-blur sm:bottom-6 sm:right-6">
        <span aria-hidden="true">{playing ? '♫' : '♪'}</span>
        {t(`gallery.${playing ? 'musicOn' : 'musicOff'}`)}
      </button>
    </> : <main className="grid min-h-screen place-items-center bg-charcoal px-4 py-12 text-ivory">
      <section className="w-full max-w-md border border-gold/40 bg-ivory/95 p-8 text-charcoal shadow-soft sm:p-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">{coupleName}</p>
        <h1 className="font-serif text-5xl leading-none">{t('gate.title')}</h1>
        <p className="mt-5 leading-7 text-charcoal/75">{t('gate.intro')}</p>
        <form className="mt-8 space-y-4" onSubmit={submit}>
          <label className="sr-only" htmlFor="password">{t('gate.placeholder')}</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t('gate.placeholder')}
            className="w-full border border-gold/30 bg-white px-4 py-3 text-charcoal outline-none transition focus:border-charcoal"
          />
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button type="submit" className="w-full bg-charcoal px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-ivory transition hover:bg-olive">
            {t('gate.button')}
          </button>
        </form>
      </section>
    </main>}
  </>;
}
