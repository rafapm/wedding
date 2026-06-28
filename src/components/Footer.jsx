import { weddingConfig } from '../data/weddingConfig';

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div>
          <p className="font-serif text-3xl">{weddingConfig.couple.firstNames}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.22em] text-ivory/70">
            {weddingConfig.displayDate} · {weddingConfig.venue.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
