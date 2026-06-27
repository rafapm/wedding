import SectionHeader from '../components/SectionHeader';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section className="section">
      <SectionHeader title={t('contact.title')} intro={t('contact.intro')} />
      <div className="grid gap-5 md:grid-cols-2">
        <article className="border border-gold/25 bg-white/55 p-8">
          <h2 className="font-serif text-4xl">{t('contact.couple')}</h2>
          <a className="mt-4 block text-charcoal/70 underline-offset-4 hover:underline" href={`mailto:${weddingConfig.contact.email}`}>
            {weddingConfig.contact.email}
          </a>
          <p className="mt-2 text-charcoal/70">{weddingConfig.contact.phone}</p>
        </article>
        <article className="border border-gold/25 bg-white/55 p-8">
          <h2 className="font-serif text-4xl">{t('contact.planner')}</h2>
          <a className="mt-4 block text-charcoal/70 underline-offset-4 hover:underline" href={`mailto:${weddingConfig.contact.plannerEmail}`}>
            {weddingConfig.contact.plannerEmail}
          </a>
        </article>
      </div>
    </section>
  );
}
