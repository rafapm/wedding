import { Link } from 'react-router-dom';
import { weddingConfig } from '../data/weddingConfig';
import FAQAccordion from '../components/FAQAccordion';
import SectionHeader from '../components/SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

export default function FAQ() {
  const { t } = useTranslation();
  const items = t('faq.items', []).map(([question, answer, sources, kind]) => [
    question,
    kind === 'contacts' ? (
      <>
        {answer}
        {weddingConfig.contact.couple.map((person) => (
          <span key={person.key} className="mt-5 block">
            <span className="block font-semibold text-charcoal">{t(`contact.names.${person.key}`, person.name)}</span>
            <a className="mt-1 block underline underline-offset-4" href={`mailto:${person.email}`}>{person.email}</a>
            <a className="mt-1 block underline underline-offset-4" href={`tel:${person.phone.replace(/[^+\d]/g, '')}`}>{person.phone}</a>
          </span>
        ))}
      </>
    ) : kind === 'dressCode' ? (
      <>
        {answer.split(t('nav.dress')).map((part, index) => (
          <span key={index}>
            {index > 0 && <Link to="/dress-code" className="underline underline-offset-4 hover:text-olive">{t('nav.dress')}</Link>}
            {part}
          </span>
        ))}
      </>
    ) : answer,
    sources,
  ]);
  return (
    <section className="section">
      <SectionHeader title={t('faq.title')} />
      <FAQAccordion items={items} />
    </section>
  );
}
