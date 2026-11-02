import { useState } from 'react';
import { weddingConfig } from '../data/weddingConfig';
import SectionHeader from '../components/SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

const sections = ['airports', 'tips'];
const hotelQuery = 'ME Sitges Terramar, Passeig Marítim 80, Sitges, Spain';
const hotelMap = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelQuery)}`;
const hotelRoute = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(hotelQuery)}&destination=${encodeURIComponent(weddingConfig.venue.address)}&travelmode=driving`;
const overviewMap = 'https://www.google.com/maps/d/embed?mid=1aWvzZ7YKL3-zugf9z3249Rb7VjwHBPA';
const mapViews = {
  all: { center: '41.30,1.94', zoom: 10 },
  hotel: { center: '41.22527,1.78728', zoom: 15 },
  venue: { center: '41.21135253,1.71312019', zoom: 15 },
  airport: { center: '41.2974,2.0833', zoom: 13 },
  barcelona: { center: '41.387,2.1701', zoom: 14 },
};
const alternatives = ['Hotel Calipolis', 'Eurostars Sitges', 'MiM Sitges'];
const categories = ['restaurants', 'coffee', 'sightseeing', 'beaches', 'museums', 'dayTrips'];

function RecommendationItem({ item }) {
  if (typeof item === 'string') return item;

  return (
    <>
      <a className="underline-offset-4 hover:underline" href={item.url} target="_blank" rel="noreferrer">
        {item.label}
      </a>
      {item.note && <span> {item.note}</span>}
    </>
  );
}

export default function TravelStay() {
  const { t, language } = useTranslation();
  const [mapView, setMapView] = useState('all');
  const selectedView = mapViews[mapView];
  return (
    <>
      <section className="section">
        <SectionHeader title={t('travel.title')} intro={t('travel.intro')} />
        <article className="border border-gold/30 bg-white/60 p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">{t('travel.lodging.eyebrow')}</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">ME Sitges Terramar</h2>
          <p className="mt-3 text-sm uppercase tracking-wide text-charcoal/60">Passeig Marítim, 80 · 08870 Sitges, Spain</p>
          <p className="mt-5 max-w-3xl leading-8 text-charcoal/75">{t('travel.lodging.hotelCopy')}</p>
          <div className="mt-7 border-l-4 border-gold bg-parchment p-6">
            <h3 className="font-serif text-3xl">{t('travel.lodging.waitTitle')}</h3>
            <p className="mt-3 leading-7 text-charcoal/80">{t('travel.lodging.waitCopy')}</p>
          </div>
          <div className="mt-8">
            <h3 className="font-serif text-3xl">{t('travel.lodging.shuttleTitle')}</h3>
            <p className="mt-3 max-w-3xl leading-8 text-charcoal/75">{t('travel.lodging.shuttleCopy')}</p>
          </div>
        </article>
        <div className="my-12 grid gap-6 md:grid-cols-2">
          <article className="border border-gold/25 bg-white/55 p-7">
            <h2 className="font-serif text-3xl">{t('travel.lodging.compareTitle')}</h2>
            <p className="mt-4 leading-7 text-charcoal/75">{t('travel.lodging.sitges')}</p>
            <p className="mt-4 leading-7 text-charcoal/75">{t('travel.lodging.barcelona')}</p>
          </article>
          <article className="border border-gold/25 bg-white/55 p-7">
            <h2 className="font-serif text-3xl">{t('travel.lodging.mobilityTitle')}</h2>
            <p className="mt-4 leading-7 text-charcoal/75">{t('travel.lodging.mobility')}</p>
          </article>
        </div>
        <div className="mb-12">
          <h2 className="font-serif text-4xl">{t('travel.lodging.mapTitle')}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {Object.keys(mapViews).map((view) => (
              <button
                key={view}
                type="button"
                aria-pressed={mapView === view}
                onClick={() => setMapView(view)}
                className={`border border-gold/40 px-4 py-3 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive ${mapView === view ? 'bg-olive text-white' : 'bg-white/60 text-charcoal hover:bg-parchment'}`}
              >
                {t(`travel.lodging.mapButtons.${view}`)}
              </button>
            ))}
          </div>
          <iframe
            title={t('travel.lodging.hotelMap')}
            src={`${overviewMap}&ll=${selectedView.center}&z=${selectedView.zoom}&hl=${language === 'es-MX' ? 'es' : language}`}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="mt-6 h-[530px] w-full border border-gold/25 sm:h-[560px]"
            loading="lazy"
          />
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            <a className="underline underline-offset-4" href={hotelMap} target="_blank" rel="noreferrer">{t('travel.lodging.mapLink')}</a>
            <a className="underline underline-offset-4" href={hotelRoute} target="_blank" rel="noreferrer">{t('travel.lodging.route')}</a>
          </div>
        </div>
        <div className="mb-12">
          <SectionHeader title={t('travel.lodging.otherTitle')} />
          <div className="mb-8 max-w-3xl space-y-4 leading-8 text-charcoal/75">
            {t('travel.lodging.otherNote').split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {alternatives.map((name) => (
              <a key={name} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ', Sitges, Spain')}`} target="_blank" rel="noreferrer" className="border border-gold/25 bg-white/55 p-6 font-serif text-2xl underline-offset-4 transition hover:bg-parchment hover:underline">{name}</a>
            ))}
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((key) => (
            <article key={key} className="border border-gold/25 bg-white/55 p-7">
              <h2 className="font-serif text-3xl">{t(`travel.labels.${key}`)}</h2>
              <ul className="mt-4 space-y-3 text-charcoal/70">
                {t(`travel.sections.${key}`, []).map((item) => <li key={typeof item === 'string' ? item : item.label}><RecommendationItem item={item} /></li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="section bg-parchment/60">
        <SectionHeader title={t('things.title')} intro={t('things.intro')} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((key) => (
            <article key={key} className="border border-gold/25 bg-white/55 p-7">
              <h2 className="font-serif text-3xl">{t(`things.labels.${key}`)}</h2>
              <ul className="mt-5 space-y-3">
                {t(`things.categories.${key}`, []).map((item) => (
                  <li key={typeof item === 'string' ? item : item.label} className="text-charcoal/70">
                    <RecommendationItem item={item} />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
