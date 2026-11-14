import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { hotels, hotelMapLink } from '../data/hotels';
import { useTranslation } from '../hooks/useTranslation';

const places = [
  ...hotels,
  { id: 'venue', name: 'Xalet del Nin', coords: [41.2115313, 1.7137716] },
  { id: 'airport', name: 'Barcelona-El Prat (BCN)', coords: [41.2983405, 2.0800095] },
];
const views = ['stays', 'all', ...places.map(({ id }) => id)];

export default function StayMap() {
  const { t, language } = useTranslation();
  const container = useRef(null);
  const map = useRef(null);
  const markers = useRef({});
  const [view, setView] = useState('stays');

  useEffect(() => {
    const instance = L.map(container.current, { scrollWheelZoom: false, zoomControl: false });
    map.current = instance;
    L.control.zoom({ zoomInTitle: t('travel.lodging.zoomIn'), zoomOutTitle: t('travel.lodging.zoomOut') }).addTo(instance);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom: 19,
    }).addTo(instance);
    places.forEach((place, index) => {
      const marker = L.marker(place.coords, {
        title: place.name,
        icon: L.divIcon({ className: 'stay-map-icon', html: `<span class="stay-map-pin ${place.id === 'calipolis' ? 'stay-map-pin-featured' : place.id === 'venue' ? 'stay-map-pin-venue' : ''}">${index < 4 ? index + 1 : place.id === 'venue' ? '♥' : place.id === 'airport' ? '✈' : 'B'}</span>`, iconSize: [32, 32], iconAnchor: [16, 16] }),
      }).addTo(instance);
      const popup = document.createElement('div');
      const name = document.createElement('strong'); name.textContent = place.name; popup.append(name);
      if (place.id === 'calipolis') {
        const detail = document.createElement('p'); detail.textContent = t('travel.lodging.pickup'); popup.append(detail);
      }
      const link = document.createElement('a');
      link.href = index < 4 ? hotelMapLink(place) : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`;
      link.target = '_blank'; link.rel = 'noreferrer'; link.textContent = t('travel.lodging.mapLink');
      popup.append(document.createElement('br'), link);
      marker.bindPopup(popup); markers.current[place.id] = marker;
    });
    const observer = new ResizeObserver(() => instance.invalidateSize()); observer.observe(container.current);
    return () => { observer.disconnect(); instance.remove(); map.current = null; markers.current = {}; };
  }, [language]);

  useEffect(() => {
    const instance = map.current;
    if (!instance) return;
    instance.closePopup();
    if (view === 'all' || view === 'stays') {
      const visible = view === 'all' ? places : places.filter(p => p.id !== 'airport');
      instance.fitBounds(visible.map(p => p.coords), { padding: [40, 40], maxZoom: 14, animate: false });
    } else {
      instance.setView(places.find(p => p.id === view).coords, view === 'airport' ? 13 : 16, { animate: false });
      markers.current[view]?.openPopup();
    }
  }, [view, language]);

  return <>
    <div className="mt-5 flex flex-wrap gap-2" aria-label={t('travel.lodging.hotelMap')}>
      {views.map(id => <button key={id} type="button" aria-pressed={view === id} onClick={() => setView(id)} className={`border border-gold/40 px-4 py-3 text-sm transition ${view === id ? 'bg-olive text-white' : 'bg-white/60 hover:bg-parchment'}`}>{t(`travel.lodging.mapButtons.${id}`)}</button>)}
    </div>
    <div ref={container} role="region" aria-label={t('travel.lodging.hotelMap')} className="relative z-0 mt-6 h-[420px] w-full border border-gold/25 sm:h-[520px]" />
    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal/75">
      {hotels.map((hotel, i) => <button key={hotel.id} onClick={() => setView(hotel.id)} className="underline-offset-4 hover:underline"><span className={`mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs text-white ${i === 0 ? 'bg-olive' : 'bg-charcoal'}`}>{i + 1}</span>{hotel.name}{i === 0 && ` · ${t('travel.lodging.pickup')}`}</button>)}
    </div>
  </>;
}
