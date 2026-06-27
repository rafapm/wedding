import SectionHeader from '../components/SectionHeader';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

export default function RSVP() {
  const { t } = useTranslation();
  return (
    <section className="section">
      <SectionHeader title={t('rsvp.title')} intro={t('rsvp.intro')} />
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
        {t('rsvp.deadline')}: {weddingConfig.rsvp.deadline}
      </p>
      <div className="overflow-hidden border border-gold/25 bg-white shadow-soft">
        <iframe title="RSVP Google Form" src={weddingConfig.rsvp.googleFormEmbedUrl} className="h-[780px] w-full border-0" loading="lazy">
          {t('common.openForm')}
        </iframe>
      </div>
      <a href={weddingConfig.rsvp.googleFormUrl} className="button-dark mt-6 inline-block" target="_blank" rel="noreferrer">
        {t('common.openForm')}
      </a>
    </section>
  );
}
