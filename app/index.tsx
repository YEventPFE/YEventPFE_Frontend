import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { isVersionCorrect } from "@/utils/serverVersion";
import WaitingScreen from "@/components/WaitingScreen";
import { Redirect } from "expo-router";
import { UserDTO } from "@/dto/userDTO";
import { getUser } from "@/viewModels/authViewModel";

export default function Index() {
  const { t } = useTranslation();
  const [loadingServerVersion, setLoadingServerVersion] = useState(true);
  const [versionValid, setVersionValid] = useState<Boolean | null>(null);
  const [loadingGetUser, setLoadingGetUser] = useState(true);
  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    console.debug("Checking server version...");
    const checkVersion = async () => {
      console.debug("Calling api");
      const isValid = await isVersionCorrect();
      console.debug("Version check result:", isValid);
      setVersionValid(isValid);
      setLoadingServerVersion(false);
    };
    checkVersion();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try{
        console.debug("Checking if user is already logged in...");
        const userData = await getUser();
        if (userData) {
          console.debug("User found:", userData.user);
          setUser(userData.user);
        } else {
          console.debug("No user found, preparing to redirect to login.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoadingGetUser(false);
      }
    };
    fetchUser();
  }, []);

  if (loadingServerVersion || loadingGetUser) return <WaitingScreen />;

  if (!versionValid) return <Redirect href="/unsupported" />;
  if (!user) return <Redirect href="/(auth)/login" />;

  return <Redirect href="/main" />;

}
