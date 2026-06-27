import FAQAccordion from '../components/FAQAccordion';
import SectionHeader from '../components/SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

export default function FAQ() {
  const { t } = useTranslation();
  return (
    <section className="section">
      <SectionHeader title={t('faq.title')} />
      <FAQAccordion items={t('faq.items', [])} />
    </section>
  );
}
