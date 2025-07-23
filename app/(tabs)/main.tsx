import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AppTitle from "@/components/AppTitle";
import { useFonts } from 'expo-font';
import WaitingScreen from "@/components/WaitingScreen";
import { getRandomEvents } from "@/services/eventService";
import { useEffect, useState } from "react";
import { EventDTO } from "@/dto/eventDTO";
import EventList from "@/components/EventList";
import { useRouter } from "expo-router";
import { useEventContext } from "@/context/EventContext";
import { getUser, logOut } from "@/viewModels/authViewModel";
import { UserDTO } from "@/dto/userListDTO";


export default function Main() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<EventDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ token: string , user: UserDTO } | null>(null);


  const { setSelectedEvent } = useEventContext();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "WorkSans-Bold": require("assets/fonts/WorkSans/WorkSans-Bold.ttf"),
  });

  useEffect(() => {
    const getEvents = async () => {
      await fetchRandomEvents();
    };
    const getUser = async () => {
      const user = await fetchUser();
      setUser(user);
    };
    getEvents();
    getUser();
  }, []);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
        <WaitingScreen
          loadingText={t('loading_fonts')}
          showTitle={false}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppTitle showSubtitle={true} />
      <Text style={styles.welcomeText}>{t("welcome_to_your_yevent") + ", " + (user?.user.name || "")}</Text>
       {
          loading && (
            <View>
              <Text>Loading events...</Text>
            </View>
          )
        }
        {
          events.length > 0 && (
            <View>
              <EventList
                events={events}
                onEventPress={(e) => {
                  console.log("Event pressed:", e);
                  setSelectedEvent(e);
                  router.push({
                    pathname: '/(tabs)/eventDetail',
                    params: { id: e.id }
                  });
                }}
                onTagPress={(tag) => console.log("Tag pressed:", tag)}
              />
            </View>
          )}
        {
          events.length === 0 && !loading && (
            <Text>{t('no_events_found')}</Text>
          )
        }
         <Pressable onPress={() => {
          console.log("User logout pressed");
          logOut();
          router.replace('/(auth)/login');
        }}>
          <Text>{t('logout')}</Text>
        </Pressable>
    </View>
  );

  async function fetchUser() : Promise<{ token: string , user: UserDTO } | null> {
    return getUser();
  }
  async function fetchRandomEvents() {
    console.log("Fetching random events...");
    setLoading(true);
    try {
      const randomEvents = await getRandomEvents(5);
      console.log("Random events fetched:", randomEvents);
      setEvents(randomEvents);
    } catch (error) {
      console.error("Error fetching random events:", error);
    } finally {
      setLoading(false);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
});