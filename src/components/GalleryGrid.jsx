import { useTranslation } from '../hooks/useTranslation';

export default function GalleryGrid({ images }) {
  const { t } = useTranslation();
  const assetUrl = (path) => (path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {images.map((image, index) => (
        <figure key={image.src} className={`${index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
          <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-parchment via-ivory to-olive/30">
            <img src={assetUrl(image.src)} alt={image.alt} loading="lazy" className="h-full w-full object-cover mix-blend-multiply" />
          </div>
          <figcaption className="mt-3 text-sm uppercase tracking-[0.16em] text-charcoal/60">{t(`gallery.${image.captionKey}`)}</figcaption>
        </figure>
      ))}
    </div>
  );
}
