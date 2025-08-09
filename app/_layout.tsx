import '@/internationalization/i18n';
import { I18nextProvider } from 'react-i18next';
import { Stack } from "expo-router";
import i18n from '@/internationalization/i18n';
import { EventProvider } from '@/context/EventContext';
import React, { Children } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import GlobalStyles from '@/styles/global';

export default function RootLayout() {
  return (
    <AppProviders>
      <SafeAreaView style={styles.safeArea}>
        <Stack
          screenOptions={{
          headerShown: false,
          header: () => null,
          animation: "default",
          animationDuration: 300,
        }}
        />
      </SafeAreaView>
    </AppProviders>
  );
}

const AppProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <I18nextProvider i18n={i18n}>
      <EventProvider>
        {children}
      </EventProvider>
    </I18nextProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlobalStyles.container.backgroundColor,
  },
})