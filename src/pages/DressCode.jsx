import SectionHeader from '../components/SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

export default function DressCode() {
  const { t } = useTranslation();
  return (
    <section className="section">
      <SectionHeader title={t('dress.title')} intro={t('dress.intro')} />
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6 text-lg leading-8 text-charcoal/75">
          <p>{t('dress.description')}</p>
          <p>{t('dress.palette')}</p>
          <p>{t('dress.avoid')}</p>
        </div>
        <div>
          <h2 className="font-serif text-4xl">{t('dress.inspiration')}</h2>
          <div className="mt-5 grid grid-cols-5 gap-3">
            {['#f8f3ea', '#d8c3a5', '#b8945f', '#63724f', '#282622'].map((color) => (
              <span key={color} className="aspect-square border border-gold/20" style={{ backgroundColor: color }} />
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="aspect-[3/4] bg-parchment" />
            <div className="aspect-[3/4] bg-gold/25" />
            <div className="aspect-[3/4] bg-olive/25" />
          </div>
        </div>
      </div>
    </section>
  );
}
