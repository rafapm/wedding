import { useState } from 'react';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

export default function PasswordGate({ children }) {
  const [allowed, setAllowed] = useState(() => localStorage.getItem('jr-access') === 'granted');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { language, t } = useTranslation();
  const coupleName = language === 'az' ? 'Günay & Rafael' : weddingConfig.couple.firstNames;

  const submit = (event) => {
    event.preventDefault();
    if (password.trim() === weddingConfig.password) {
      localStorage.setItem('jr-access', 'granted');
      setAllowed(true);
      return;
    }
    setError(t('gate.error'));
  };

  if (allowed) return children;

  return (
    <main className="grid min-h-screen place-items-center bg-charcoal px-4 py-12 text-ivory">
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
    </main>
  );
}
