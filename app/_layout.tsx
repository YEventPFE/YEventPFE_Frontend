import '@/internationalization/i18n';
import { I18nextProvider } from 'react-i18next';
import { Stack } from "expo-router";
import i18n from '@/internationalization/i18n';

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <Stack />
    </I18nextProvider>
  );
}
