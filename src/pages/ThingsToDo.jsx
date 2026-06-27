import SectionHeader from '../components/SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

const categories = ['restaurants', 'coffee', 'sightseeing', 'beaches', 'museums', 'dayTrips'];

export default function ThingsToDo() {
  const { t } = useTranslation();
  return (
    <section className="section">
      <SectionHeader title={t('things.title')} intro={t('things.intro')} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((key) => (
          <article key={key} className="border border-gold/25 bg-white/55 p-7">
            <h2 className="font-serif text-3xl capitalize">{key.replace(/([A-Z])/g, ' $1')}</h2>
            <ul className="mt-5 space-y-3">
              {t(`things.categories.${key}`, []).map((item) => <li key={item} className="text-charcoal/70">{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
