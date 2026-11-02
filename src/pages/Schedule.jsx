import EventCard from '../components/EventCard';
import SectionHeader from '../components/SectionHeader';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';

export default function Schedule() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <SectionHeader title={t('schedule.title')} intro={t('schedule.intro')} />
      <div className="grid gap-5 md:grid-cols-2">
        {weddingConfig.schedule.map((event) => (
          <EventCard key={event.key} event={event} copy={t(`schedule.events.${event.key}`)} />
        ))}
      </div>
      <div className="mt-14 mx-auto max-w-3xl">
        <SectionHeader title={t('schedule.timelineTitle')} intro={t('schedule.timelineNote')} />
        <ol className="divide-y divide-gold/25 border-y border-gold/25">
          {t('schedule.timeline', []).map((item) => (
            <li key={item.title} className="grid gap-2 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <span className="text-sm font-semibold tracking-wide text-olive">{item.time}</span>
              <span className="font-serif text-3xl">{item.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
