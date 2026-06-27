import { createContext, createElement, useContext, useMemo, useState } from 'react';
import en from '../locales/en';
import esMX from '../locales/es-MX';
import az from '../locales/az';

const dictionaries = { en, 'es-MX': esMX, az };
const LanguageContext = createContext(null);

export const languages = [
  { code: 'en', label: 'EN' },
  { code: 'es-MX', label: 'ES' },
  { code: 'az', label: 'AZ' },
];

function readPath(obj, path) {
  return path.split('.').reduce((value, key) => value?.[key], obj);
}

export function TranslationProvider({ children }) {
  const [language, setLanguageState] = useState(() => localStorage.getItem('jr-language') || 'en');
  const dictionary = dictionaries[language] || dictionaries.en;

  const value = useMemo(() => {
    const setLanguage = (nextLanguage) => {
      setLanguageState(nextLanguage);
      localStorage.setItem('jr-language', nextLanguage);
      document.documentElement.lang = nextLanguage;
    };

    const t = (path, fallback = '') => readPath(dictionary, path) ?? readPath(dictionaries.en, path) ?? fallback;

    return { language, setLanguage, t, dictionary };
  }, [dictionary, language]);

  return createElement(LanguageContext.Provider, { value }, children);
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used inside TranslationProvider');
  return context;
}
