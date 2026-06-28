import SectionHeader from '../components/SectionHeader';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

export default function Venue() {
  const { t } = useTranslation();
  const assetUrl = (path) => (path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path);

  return (
    <section className="section">
      <SectionHeader title={t('venue.title')} intro={t('venue.intro')} />
      <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <article>
          <h2 className="font-serif text-4xl">{t('venue.aboutTitle')}</h2>
          <p className="mt-4 leading-8 text-charcoal/70">{t('venue.about')}</p>
        </article>
        <img
          className="aspect-video w-full bg-charcoal object-cover lg:-mt-14"
          src={assetUrl(weddingConfig.media.venueImage)}
          alt="Xalet del Nin by the Mediterranean coast"
          loading="lazy"
        />
      </div>
      <div className="mt-14 max-w-4xl">
        <h2 className="font-serif text-4xl">{t('venue.detailsTitle')}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {t('venue.details', []).map((detail) => (
            <article key={detail.title} className="border border-gold/25 bg-white/55 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{detail.title}</p>
              <p className="mt-4 leading-7 text-charcoal/70">{detail.body}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-14 max-w-3xl">
        <h2 className="font-serif text-4xl">{t('venue.gettingThereTitle')}</h2>
        <p className="mt-4 leading-8 text-charcoal/70">{t('venue.gettingThere')}</p>
        <a className="mt-4 block text-charcoal/70 underline-offset-4 hover:underline" href={weddingConfig.venue.addressUrl} target="_blank" rel="noreferrer">
          {weddingConfig.venue.address}
        </a>
        <a className="mt-2 block text-charcoal/70 underline-offset-4 hover:underline" href={weddingConfig.venue.websiteUrl} target="_blank" rel="noreferrer">
          {t('venue.websiteLink')}
        </a>
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
