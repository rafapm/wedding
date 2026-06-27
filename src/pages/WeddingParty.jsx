import SectionHeader from '../components/SectionHeader';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

export default function WeddingParty() {
  const { t } = useTranslation();
  return (
    <section className="section">
      <SectionHeader title={t('party.title')} intro={t('party.intro')} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {weddingConfig.weddingParty.map((person) => (
          <article key={`${person.roleKey}-${person.name}`} className="border border-gold/25 bg-white/55 p-5">
            <div className="aspect-[4/5] bg-gradient-to-br from-parchment to-olive/30">
              <img src={person.photo} alt="" loading="lazy" className="h-full w-full object-cover opacity-80" />
            </div>
            <h2 className="mt-5 font-serif text-3xl">{person.name}</h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">{t(`party.roles.${person.roleKey}`)}</p>
            <p className="mt-4 text-sm leading-6 text-charcoal/70">{t(`party.${person.bioKey}`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
