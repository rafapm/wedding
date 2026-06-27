import { Link } from 'react-router-dom';
import HeroVideo from '../components/HeroVideo';
import SectionHeader from '../components/SectionHeader';
import EventCard from '../components/EventCard';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

const quickLinks = [
  ['/rsvp', 'rsvp'],
  ['/travel-stay', 'travel'],
  ['/schedule', 'schedule'],
  ['/faq', 'faq'],
];

export default function Home() {
  const { t } = useTranslation();
  const events = weddingConfig.schedule.slice(0, 3);

  return (
    <>
      <HeroVideo />
      <section className="section">
        <SectionHeader eyebrow="June & Rafael" title={t('home.welcomeTitle')} intro={t('home.welcome')} centered />
      </section>
      <section className="section bg-parchment/60">
        <SectionHeader title={t('home.weekendTitle')} />
        <div className="grid gap-5 md:grid-cols-3">
          {events.map((event) => <EventCard key={event.key} event={event} copy={t(`schedule.events.${event.key}`)} />)}
        </div>
      </section>
      <section className="section grid items-center gap-10 lg:grid-cols-2">
        <div className="aspect-[4/5] bg-gradient-to-br from-olive/25 via-parchment to-gold/20" />
        <div>
          <SectionHeader title={t('home.venueTitle')} intro={t('home.venueCopy')} />
          <Link to="/venue" className="button-dark">{t('nav.venue')}</Link>
        </div>
      </section>
      <section className="section bg-charcoal text-ivory">
        <h2 className="font-serif text-5xl">{t('home.quickLinks')}</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map(([to, key]) => (
            <Link key={to} to={to} className="border border-ivory/25 p-5 text-sm font-semibold uppercase tracking-[0.18em] transition hover:bg-ivory hover:text-charcoal">
              {t(`nav.${key}`)}
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeader title={t('contact.title')} intro={t('contact.intro')} />
        <div className="grid gap-5 md:grid-cols-2">
          <article className="border border-gold/25 bg-white/55 p-8">
            <h2 className="font-serif text-4xl">{t('contact.couple')}</h2>
            <a className="mt-4 block text-charcoal/70 underline-offset-4 hover:underline" href={`mailto:${weddingConfig.contact.email}`}>
              {weddingConfig.contact.email}
            </a>
            <p className="mt-2 text-charcoal/70">{weddingConfig.contact.phone}</p>
          </article>
          <article className="border border-gold/25 bg-white/55 p-8">
            <h2 className="font-serif text-4xl">{t('contact.planner')}</h2>
            <a className="mt-4 block text-charcoal/70 underline-offset-4 hover:underline" href={`mailto:${weddingConfig.contact.plannerEmail}`}>
              {weddingConfig.contact.plannerEmail}
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
