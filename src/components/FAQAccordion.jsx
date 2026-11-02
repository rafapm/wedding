import { useState } from 'react';

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-gold/20 border-y border-gold/20">
      {items.map(([question, answer, sources = []], index) => (
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
          {open === index && (
            <div className="pb-6 leading-7 text-charcoal/70">
              <p className="whitespace-pre-line">{answer}</p>
              {sources.length > 0 && <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4 hover:text-olive">{source.label}</a>)}
              </div>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
