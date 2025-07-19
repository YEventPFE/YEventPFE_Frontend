import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import * as en from './locales/en.json';
import * as fr from './locales/fr.json';


const languageDetector: LanguageDetectorAsyncModule  = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lang: string) => void) => {
    const locale = Localization.getLocales()[0]?.languageCode || 'en';
    callback(locale);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    compatibilityJSON: 'v4',
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
