import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  const resetAccess = () => {
    localStorage.removeItem('jr-access');
    window.location.reload();
  };

  return (
    <footer className="border-t border-gold/20 bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="font-serif text-3xl">{weddingConfig.couple.firstNames}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.22em] text-ivory/70">
            {weddingConfig.displayDate} · {weddingConfig.venue.location}
          </p>
        </div>
        <button type="button" onClick={resetAccess} className="self-center text-left text-sm text-ivory/70 underline-offset-4 hover:text-ivory hover:underline">
          {t('common.resetAccess')}
        </button>
      </div>
    </footer>
  );
}
