import SectionHeader from '../components/SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

const sections = ['airports', 'hotels', 'neighborhoods', 'transportation', 'tips'];

export default function TravelStay() {
  const { t } = useTranslation();
  return (
    <section className="section">
      <SectionHeader title={t('travel.title')} intro={t('travel.intro')} />
      <div className="grid gap-5 md:grid-cols-2">
        {sections.map((key) => (
          <article key={key} className="border border-gold/25 bg-white/55 p-7">
            <h2 className="font-serif text-3xl capitalize">{key === 'tips' ? 'Travel Tips' : key}</h2>
            <ul className="mt-4 space-y-3 text-charcoal/70">
              {t(`travel.sections.${key}`, []).map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
