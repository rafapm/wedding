import { useState } from 'react';
import StayMap from '../components/StayMap';
import { hotels, hotelMapLink, hotelDirections } from '../data/hotels';
import { weddingConfig } from '../data/weddingConfig';
import SectionHeader from '../components/SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

const sections = ['airports', 'tips'];
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
  const { t } = useTranslation();
  const [copyState, setCopyState] = useState('');
  const calipolis = hotels[0];
  const copyCode = async () => {
    try { await navigator.clipboard.writeText('BODAYMIEL'); setCopyState('copied'); }
    catch { setCopyState('copyFallback'); }
  };
  const hotelLinks = (hotel) => <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">
    <a className="underline underline-offset-4" href={hotelMapLink(hotel)} target="_blank" rel="noreferrer">{t('travel.lodging.mapLink')}</a>
    <a className="underline underline-offset-4" href={hotelDirections(hotel, weddingConfig.venue.address)} target="_blank" rel="noreferrer">{t('travel.lodging.route')}</a>
  </div>;
  return (
    <>
      <section className="section">
        <SectionHeader title={t('travel.title')} intro={t('travel.intro')} />
        <article className="border border-gold/30 bg-white/60 p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">{t('travel.lodging.eyebrow')}</p>
            <span className="border border-olive/25 bg-olive/10 px-3 py-2 text-xs font-medium text-olive">{t('travel.lodging.pickup')}</span>
          </div>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Hotel Calipolis</h2>
          <p className="mt-3 text-sm uppercase tracking-wide text-charcoal/60">{calipolis.address}</p>
          <p className="mt-5 max-w-3xl leading-8 text-charcoal/75">{t('travel.lodging.hotelCopy')}</p>
          <div className="mt-7 grid gap-7 border-l-4 border-gold bg-parchment p-5 sm:p-7 lg:grid-cols-[1fr_auto]">
            <div>
              <h3 className="font-serif text-3xl">{t('travel.lodging.bookingTitle')}</h3>
              <p className="mt-3 max-w-2xl leading-7 text-charcoal/80">{t('travel.lodging.bookingCopy')}</p>
            </div>
            <div className="flex min-w-0 flex-col items-start justify-center lg:items-center">
              <p className="text-xs uppercase tracking-widest text-olive">{t('travel.lodging.codeLabel')}</p>
              <code className="my-3 select-all text-2xl tracking-[0.12em] text-charcoal sm:text-3xl">BODAYMIEL</code>
              <button type="button" onClick={copyCode} className="border-b border-charcoal/50 pb-1 text-sm">{t(`travel.lodging.${copyState === 'copied' ? 'copied' : 'copy'}`)}</button>
              <span role="status" className="mt-2 text-xs text-olive">{copyState ? t(`travel.lodging.${copyState}`) : ''}</span>
            </div>
          </div>
          <div className="mt-6 grid gap-4 text-sm leading-6 text-charcoal/75 md:grid-cols-3">
            {['early', 'cancellation', 'club'].map(key => <p key={key}>{t(`travel.lodging.${key}`)}</p>)}
          </div>
          <a className="button-dark mt-7 inline-block" href={calipolis.website} target="_blank" rel="noreferrer">{t('travel.lodging.book')} ↗</a>
          {hotelLinks(calipolis)}
        </article>
        <div className="my-12">
          <h2 className="font-serif text-4xl">{t('travel.lodging.otherTitle')}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-charcoal/75">{t('travel.lodging.otherNote')}</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {hotels.slice(1).map(hotel => <article key={hotel.id} className="flex flex-col border border-gold/25 bg-white/55 p-6 sm:p-7">
              <h3 className="font-serif text-3xl">{hotel.name}</h3>
              <p className="mt-3 text-xs uppercase tracking-wide text-charcoal/60">{hotel.address}</p>
              <p className="mt-4 leading-7 text-charcoal/75">{t(`travel.lodging.${hotel.id}Copy`)}</p>
              {hotel.wedding && <p className="mt-4 border-t border-gold/25 pt-4 text-sm leading-6 text-charcoal/70">{t('travel.lodging.terramarRate')}</p>}
              <div className="mt-auto pt-6">
                <a className="font-medium underline underline-offset-4" href={hotel.website} target="_blank" rel="noreferrer">{t('travel.lodging.website')} ↗</a>
                {hotel.wedding && <a className="mt-3 block text-sm underline underline-offset-4" href={hotel.wedding} target="_blank" rel="noreferrer">{t('travel.lodging.weddingRate')} ↗</a>}
                {hotelLinks(hotel)}
              </div>
            </article>)}
          </div>
        </div>
        <article className="my-12 border-y border-gold/30 py-8 sm:flex sm:gap-10">
          <h2 className="font-serif text-3xl sm:w-1/3 sm:shrink-0">{t('travel.lodging.shuttleTitle')}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-charcoal/75 sm:mt-0">{t('travel.lodging.shuttleCopy')}</p>
        </article>
        <div className="my-12">
          <h2 className="font-serif text-4xl">{t('travel.lodging.mapTitle')}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-charcoal/75">{t('travel.lodging.mapNote')}</p>
          <StayMap />
        </div>
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
