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
        <div className="mx-auto max-w-5xl space-y-16">
          {sections.map((item, index) => (
            <article key={item.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <img
                src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${['/images/gallery/img-1603.jpeg', '/images/gallery/img-1485.jpeg', '/images/gallery/luna-leia-mochi-cleaned.png', '/images/gallery/fix-0926.jpg'][index]}`}
                alt=""
                loading="lazy"
                className={`${index === 2 ? 'aspect-square object-contain' : 'aspect-[4/5] object-cover'} w-full ${index % 2 ? 'md:order-2' : ''}`}
              />
              <div>
              <h2 className="font-serif text-4xl">{item.title}</h2>
              <p className="mt-5 leading-8 text-charcoal/70">{item.body}</p>
              </div>
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
