import { languages, useTranslation } from '../hooks/useTranslation';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center rounded-full border border-gold/30 bg-ivory/70 p-1" aria-label="Select language">
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLanguage(item.code)}
          className={`min-h-8 rounded-full px-3 text-xs font-semibold tracking-[0.16em] transition ${
            language === item.code ? 'bg-charcoal text-ivory' : 'text-charcoal hover:bg-parchment'
          }`}
          aria-pressed={language === item.code}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
