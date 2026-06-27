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
    </section>
  );
}
