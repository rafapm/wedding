export default function EventCard({ event, copy }) {
  const date = copy.date || event.date;
  const time = copy.time || event.time;
  const location = copy.location || event.location;

  return (
    <article className="border border-gold/25 bg-white/55 p-6 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{date}</p>
      <h2 className="mt-4 font-serif text-4xl text-charcoal">{copy.title}</h2>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-olive">{time}</p>
      {location && <p className="mt-2 text-sm uppercase tracking-[0.16em] text-charcoal/55">{location}</p>}
      <p className="mt-4 leading-7 text-charcoal/70">{copy.description}</p>
    </article>
  );
}
