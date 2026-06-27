import GalleryGrid from '../components/GalleryGrid';
import SectionHeader from '../components/SectionHeader';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

export default function OurStory() {
  const { t } = useTranslation();
  const sections = t('story.sections', []);

  return (
    <>
      <section className="section">
        <SectionHeader title={t('story.title')} intro={t('story.intro')} />
        <div className="grid gap-6 lg:grid-cols-3">
          {sections.map((item) => (
            <article key={item.title} className="border border-gold/25 bg-white/50 p-8">
              <h2 className="font-serif text-4xl">{item.title}</h2>
              <p className="mt-5 leading-8 text-charcoal/70">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section bg-parchment/60">
        <SectionHeader title={t('gallery.title')} intro={t('gallery.intro')} />
        <GalleryGrid images={weddingConfig.galleryImages} />
      </section>
    </>
  );
}
