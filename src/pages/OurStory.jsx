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
        <div className="mx-auto max-w-5xl space-y-12 sm:space-y-16">
          {sections.map((item, index) => (
            <article key={item.title} className="grid gap-6 md:grid-cols-2 md:gap-12">
              <div className={`relative mx-auto w-full ${index === 0 ? 'aspect-[526/688] max-w-[367px]' : index === 1 ? 'aspect-[4/3] self-center' : `${index === 2 ? 'h-[280px] max-w-sm' : index === 3 ? 'aspect-[3/2]' : 'h-[300px] sm:h-[340px]'} md:aspect-auto md:h-auto md:min-h-[280px] md:max-w-none`} ${index % 2 ? 'md:order-2' : ''}`}>
                <img
                  src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${['/images/gallery/story-beginning-palace.jpg', '/images/gallery/story-getting-to-know-each-other.png', '/images/gallery/luna-leia-mochi-cleaned.png', '/images/gallery/fix-0926.jpg'][index]}`}
                  alt=""
                  loading="lazy"
                  className={`absolute left-0 top-1/2 h-full w-full -translate-y-1/2 ${index === 0 ? 'object-cover object-center' : index === 1 ? 'object-contain' : 'max-h-[340px] object-contain'}`}
                />
              </div>
              <div className="self-center">
              <h2 className="font-serif text-4xl">{item.title}</h2>
              <p className="mt-5 whitespace-pre-line leading-8 text-charcoal/70">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="gallery" className="section scroll-mt-24 bg-parchment/60">
        <SectionHeader title={t('gallery.title')} intro={t('gallery.intro')} />
        <GalleryGrid images={weddingConfig.galleryImages} />
      </section>
    </>
  );
}
