import SectionHeader from '../components/SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

export default function DressCode() {
  const { t } = useTranslation();
  const sections = t('dress.sections', []);
  const inspiration = t('dress.inspirationLinks', []);

  return (
    <>
      <section className="section">
        <SectionHeader title={t('dress.title')} intro={t('dress.intro')} />
      </section>

      <section className="section bg-parchment/60">
        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="border border-gold/25 bg-white/60 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{section.eyebrow}</p>
              <h2 className="mt-3 font-serif text-4xl">{section.title}</h2>
              <p className="mt-4 leading-7 text-charcoal/70">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 sm:grid-cols-2">
            <article className="border border-gold/25 bg-white/55 p-7">
              <h3 className="font-serif text-3xl">{t('dress.womenTitle')}</h3>
              <p className="mt-4 leading-7 text-charcoal/70">{t('dress.women')}</p>
            </article>
            <article className="border border-gold/25 bg-white/55 p-7">
              <h3 className="font-serif text-3xl">{t('dress.menTitle')}</h3>
              <p className="mt-4 leading-7 text-charcoal/70">{t('dress.men')}</p>
            </article>
            <article className="border border-gold/25 bg-white/55 p-7 sm:col-span-2">
              <h3 className="font-serif text-3xl">{t('dress.avoidTitle')}</h3>
              <p className="mt-4 leading-7 text-charcoal/70">{t('dress.avoid')}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section bg-charcoal text-ivory">
        <h2 className="font-serif text-5xl">{t('dress.inspiration')}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {inspiration.map((item) => (
            <a
              key={item.url}
              className="border border-ivory/20 p-6 transition hover:bg-ivory hover:text-charcoal"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.22em]">{item.label}</span>
              <span className="mt-3 block text-sm leading-6 opacity-80">{item.note}</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
