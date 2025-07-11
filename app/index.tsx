import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { isVersionCorrect } from "@/utils/serverVersion";
import WaitingScreen from "@/components/WaitingScreen";
import { Redirect } from "expo-router";

export default function Index() {
  const { t } = useTranslation();
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


  const isAuthenticated = false;

  if (loading) return <WaitingScreen />;

  if (!versionValid) return <Redirect href="/unsupported" />;
  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;

  return <Redirect href="/tabs" />;

}
