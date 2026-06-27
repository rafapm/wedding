export default function SectionHeader({ eyebrow, title, intro, centered = false }) {
  return (
    <div className={`mb-10 max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>}
      <h1 className="font-serif text-5xl leading-none text-charcoal sm:text-6xl">{title}</h1>
      {intro && <p className="mt-5 text-lg leading-8 text-charcoal/70">{intro}</p>}
    </div>
  );
}
