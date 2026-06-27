import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';

const navItems = [
  ['/', 'home'],
  ['/our-story', 'story'],
  ['/schedule', 'schedule'],
  ['/venue', 'venue'],
  ['/travel-stay', 'travel'],
  ['/things-to-do', 'things'],
  ['/dress-code', 'dress'],
  ['/wedding-party', 'party'],
  ['/gallery', 'gallery'],
  ['/registry', 'registry'],
  ['/faq', 'faq'],
  ['/rsvp', 'rsvp'],
  ['/contact', 'contact'],
];

function linkClass({ isActive }) {
  return `block rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
    isActive ? 'bg-charcoal text-ivory' : 'text-charcoal/75 hover:bg-parchment hover:text-charcoal'
  }`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-ivory/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Primary">
        <NavLink to="/" className="font-serif text-2xl font-semibold tracking-wide text-charcoal" onClick={() => setOpen(false)}>
          June & Rafael
        </NavLink>
        <div className="hidden items-center gap-2 xl:flex">
          {navItems.map(([to, key]) => (
            <NavLink key={to} to={to} className={linkClass}>
              {t(`nav.${key}`)}
            </NavLink>
          ))}
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-3 xl:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-charcoal"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Open menu"
          >
            <span className="relative h-4 w-5">
              <span className={`absolute left-0 h-px w-5 bg-current transition ${open ? 'top-2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-2 h-px w-5 bg-current transition ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 h-px w-5 bg-current transition ${open ? 'top-2 -rotate-45' : 'top-4'}`} />
            </span>
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-gold/20 bg-ivory px-4 pb-5 xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 py-3 sm:grid-cols-2">
            {navItems.map(([to, key]) => (
              <NavLink key={to} to={to} className={linkClass} onClick={() => setOpen(false)}>
                {t(`nav.${key}`)}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
