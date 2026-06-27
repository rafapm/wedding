import SectionHeader from '../components/SectionHeader';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

export default function Venue() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <SectionHeader title={t('venue.title')} intro={t('venue.intro')} />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-8">
          <article>
            <h2 className="font-serif text-4xl">{t('venue.aboutTitle')}</h2>
            <p className="mt-4 leading-8 text-charcoal/70">{t('venue.about')}</p>
          </article>
          <article>
            <h2 className="font-serif text-4xl">{t('venue.gettingThereTitle')}</h2>
            <p className="mt-4 leading-8 text-charcoal/70">{t('venue.gettingThere')}</p>
          </article>
        </div>
        <div className="space-y-6">
          <div className="aspect-video bg-gradient-to-br from-charcoal via-olive to-gold/60" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="aspect-[4/3] bg-parchment" />
            <div className="aspect-[4/3] bg-olive/30" />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="font-serif text-4xl">{t('venue.mapTitle')}</h2>
        {weddingConfig.venue.mapEmbedUrl ? (
          <iframe title="Venue map" src={weddingConfig.venue.mapEmbedUrl} className="mt-5 h-96 w-full border-0" loading="lazy" />
        ) : (
          <div className="mt-5 grid h-96 place-items-center border border-gold/25 bg-white/45 text-charcoal/60">Map embed placeholder</div>
        )}
      </div>
    </section>
  );
}
