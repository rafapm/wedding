import { useState } from 'react';

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-gold/20 border-y border-gold/20">
      {items.map(([question, answer], index) => (
        <div key={question}>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-6 py-6 text-left"
            onClick={() => setOpen(open === index ? -1 : index)}
            aria-expanded={open === index}
          >
            <span className="font-serif text-2xl text-charcoal">{question}</span>
            <span className="text-2xl text-gold">{open === index ? '−' : '+'}</span>
          </button>
          {open === index && <p className="whitespace-pre-line pb-6 leading-7 text-charcoal/70">{answer}</p>}
        </div>
      ))}
    </div>
  );
}
