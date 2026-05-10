import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import zh from './locales/zh.json';
import ru from './locales/ru.json';
import ko from './locales/ko.json';
import ja from './locales/ja.json';
import tr from './locales/tr.json';
import vi from './locales/vi.json';
import hi from './locales/hi.json';
import pt from './locales/pt.json';
import es from './locales/es.json';

export const supportedLanguages = ['en', 'zh', 'ru', 'ko', 'ja', 'tr', 'vi', 'hi', 'pt', 'es'] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      ru: { translation: ru },
      ko: { translation: ko },
      ja: { translation: ja },
      tr: { translation: tr },
      vi: { translation: vi },
      hi: { translation: hi },
      pt: { translation: pt },
      es: { translation: es }
    },
    supportedLngs: [...supportedLanguages],
    load: 'languageOnly',
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
