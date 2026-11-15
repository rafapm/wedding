import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const categories = ['all', 'engagement', 'travel', 'together'];
const assetUrl = (path) => (path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path);

// Balance complete rows using original aspect ratios, without cropping the couple photos.
function arrangeRows(photos, width) {
  const gap = width < 640 ? 12 : 24;
  const target = width < 640 ? 180 : 255;
  const maxCount = width < 640 ? 2 : width < 900 ? 3 : 4;
  const costs = Array(photos.length + 1).fill(Infinity);
  const counts = Array(photos.length).fill(1);
  costs[photos.length] = 0;
  for (let i = photos.length - 1; i >= 0; i--) {
    let ratios = 0;
    for (let n = 1; n <= maxCount && i + n <= photos.length; n++) {
      ratios += photos[i + n - 1].width / photos[i + n - 1].height;
      const height = (width - gap * (n - 1)) / ratios;
      const cost = (height - target) ** 2 + (n === 1 ? 20000 : 0) + costs[i + n];
      if (cost < costs[i]) { costs[i] = cost; counts[i] = n; }
    }
  }
  const rows = [];
  for (let i = 0; i < photos.length; i += counts[i]) rows.push(photos.slice(i, i + counts[i]));
  return rows;
}

export default function GalleryGrid({ images }) {
  const { t } = useTranslation();
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const grid = useRef(null);
  const [gridWidth, setGridWidth] = useState(1000);
  const isOpen = selected !== null;
  const filtered = category === 'all' ? images : images.filter(image => image.category === category);
  const cats = filtered.filter(image => ['luna', 'leia', 'mochi'].includes(image.captionKey));
  const otherPhotos = filtered.filter(image => !['luna', 'leia', 'mochi'].includes(image.captionKey));
  const rows = arrangeRows(otherPhotos, gridWidth);
  const midpoint = Math.ceil(rows.length / 2);
  const galleryOrder = [...rows.slice(0, midpoint).flat(), ...cats, ...rows.slice(midpoint).flat()];
  const active = selected === null ? null : galleryOrder[selected];

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setGridWidth(entry.contentRect.width));
    observer.observe(grid.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const modal = dialog.current;
    modal.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { modal.close(); document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  const move = (direction) => setSelected(current => (current + direction + filtered.length) % filtered.length);
  const caption = (image) => t(`gallery.${image.captionKey}`);
  const renderPhoto = (image, isCat = false) => <figure key={image.src} className="min-w-0" style={isCat ? undefined : { flex: `${image.width / image.height} 1 0%` }}>
    <button type="button" onClick={() => setSelected(galleryOrder.indexOf(image))} aria-label={`${t('gallery.openPhoto')}: ${caption(image)}`} className="group block w-full overflow-hidden bg-parchment">
      <img src={assetUrl(image.src)} alt={image.alt} width={image.width} height={image.height} loading="lazy" style={{ aspectRatio: isCat ? '4 / 5' : `${image.width} / ${image.height}` }} className={`${isCat ? 'aspect-[4/5] object-cover' : 'h-auto'} w-full transition duration-300 motion-safe:group-hover:scale-[1.025]`} />
    </button>
    <figcaption className="mt-2 text-xs leading-5 text-charcoal/60 sm:text-sm">{caption(image)}</figcaption>
  </figure>;
  return <>
    <div className="mb-8 flex flex-wrap items-center gap-2">
      {categories.map(key => <button key={key} type="button" aria-pressed={category === key} onClick={() => setCategory(key)} className={`border border-gold/35 px-4 py-3 text-sm transition ${category === key ? 'bg-olive text-white' : 'bg-white/60 hover:bg-parchment'}`}>{t(`gallery.${key}`)}</button>)}
      <span className="ml-auto text-sm text-charcoal/60" role="status">{filtered.length} {t('gallery.photoCount')}</span>
    </div>
    <div ref={grid} className="space-y-6">
      {rows.map((row, index) => <div key={`${category}-${index}`}>
        {cats.length > 0 && index === midpoint && <div className="mx-auto mb-6 grid w-full max-w-xl grid-cols-3 gap-3 sm:gap-6">
          {cats.map(image => renderPhoto(image, true))}
        </div>}
        <div className="mx-auto flex items-start gap-3 sm:gap-6" style={row.length === 1 ? { maxWidth: 360 } : undefined}>
          {row.map(image => renderPhoto(image))}
        </div>
      </div>)}
      {cats.length > 0 && rows.length <= midpoint && <div className="mx-auto grid w-full max-w-xl grid-cols-3 gap-3 sm:gap-6">
        {cats.map(image => renderPhoto(image, true))}
      </div>}
    </div>
    <dialog ref={dialog} aria-label={active ? caption(active) : t('gallery.openPhoto')} onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }} className="gallery-dialog bg-charcoal text-ivory">
      {active && <div className="flex h-full flex-col p-4 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-4 text-sm">
          <p>{selected + 1} / {filtered.length}</p>
          <button type="button" autoFocus onClick={() => setSelected(null)} className="px-3 py-2">{t('gallery.close')} ×</button>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center"><img src={assetUrl(active.src)} alt={active.alt} className="max-h-full w-auto max-w-full object-contain" /></div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <button type="button" onClick={() => move(-1)} aria-label={t('gallery.previous')} className="px-4 py-3 text-2xl">←</button>
          <p className="text-center text-sm">{caption(active)}</p>
          <button type="button" onClick={() => move(1)} aria-label={t('gallery.next')} className="px-4 py-3 text-2xl">→</button>
        </div>
      </div>}
    </dialog>
  </>;
}
