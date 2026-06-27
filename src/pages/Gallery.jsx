import GalleryGrid from '../components/GalleryGrid';
import SectionHeader from '../components/SectionHeader';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

export default function Gallery() {
  const { t } = useTranslation();
  return (
    <section className="section">
      <SectionHeader title={t('gallery.title')} intro={t('gallery.intro')} />
      <GalleryGrid images={weddingConfig.galleryImages} />
    </section>
  );
}
