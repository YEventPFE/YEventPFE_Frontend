import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
import * as en from './locales/en.json';
import * as fr from './locales/fr.json';

i18n
  .use(RNLanguageDetector)
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
