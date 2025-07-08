import '@/internationalization/i18n';
import { I18nextProvider } from 'react-i18next';
import { Stack } from "expo-router";
import i18n from '@/internationalization/i18n';
import { getServerVersion } from '@/services/serverStatusService';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import WaitingScreen from '@/components/WaitingScreen';

export default function RootLayout() {

  const [loading, setLoading] = useState(true);
  const [versionValid, setVersionValid] = useState<Boolean | null>(null);

  useEffect(() => {
    console.log("Checking server version...");
    const checkVersion = async () => {
      console.log("Calling api");
      const isValid = await isVersionCorrect();
      console.log("Version check result:", isValid);
      setVersionValid(isValid);
      setLoading(false);
    };
    checkVersion();
  }, []);

  if (loading) {
    return (
      <WaitingScreen/>
    );
  }

  const isAuthenticated = false;
  return (
    <I18nextProvider i18n={i18n}>
      <Stack
        screenOptions={{
          headerShown: false,
          header: () => null,
          animation: "fade",
          animationDuration: 300,
        }}>
        {!isAuthenticated ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="(authenticated)" />
        )}
      </Stack>
    </I18nextProvider>
  );
}

const isVersionCorrect = async (): Promise<Boolean> => {
  try{
    const serverVersion = await getServerVersion();
    const expectedServerVersion = Constants?.expoConfig?.extra?.expectedServerVersion;
  
    //Check if major version is the same
    if (serverVersion && expectedServerVersion) {
      const serverMajorVersion = parseInt(serverVersion.split('.')[0], 10);
      const expectedMajorVersion = parseInt(expectedServerVersion.split('.')[0], 10);
      return serverMajorVersion === expectedMajorVersion;
    }
  }
  catch (error) {
    console.error("Error checking server version:", error);
  }
  return false;
};
