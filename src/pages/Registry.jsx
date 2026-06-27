import SectionHeader from '../components/SectionHeader';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

export default function Registry() {
  const { t } = useTranslation();
  const visibleLinks = weddingConfig.registryLinks.filter((link) => link.visible);
  return (
    <section className="section text-center">
      <SectionHeader title={t('registry.title')} intro={t('registry.message')} centered />
      {visibleLinks.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3">
          {visibleLinks.map((link) => <a key={link.label} className="button-dark" href={link.url}>{link.label}</a>)}
        </div>
      )}
    </section>
  );
}
