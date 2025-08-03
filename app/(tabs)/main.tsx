import AppTitle from "@/components/AppTitle";
import EventList from "@/components/EventList";
import WaitingScreen from "@/components/WaitingScreen";
import { EventDTO } from "@/dto/eventDTO";
import { UserDTO } from "@/dto/userDTO";
import { getRandomEvents } from "@/services/eventService";
import GlobalStyles from "@/styles/global";
import { fetchUserAndRedirect, logOut } from "@/viewModels/authViewModel";
import { useNavigateToEvent } from "@/viewModels/navigationViewModel";
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";


export default function Main() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<EventDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ token: string , user: UserDTO } | undefined>(undefined);
  const onEventPress = useNavigateToEvent();

  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "WorkSans-Bold": require("assets/fonts/WorkSans/WorkSans-Bold.ttf"),
  });

  useEffect(() => {
    const fetchEvents = async () => {
      await fetchRandomEvents();
    };
    fetchUserAndRedirect(router, setUser);
    fetchEvents();
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
    <ScrollView>
      <View style={styles.container}>
        <AppTitle showSubtitle={true} />
        <Text style={styles.welcomeText}>
          {t("welcome_to_your_yevent") + ", " + (user?.user.name || "")}
        </Text>
        {loading && (
          <View>
            <Text>Loading events...</Text>
          </View>
        )}
        {events.length > 0 && (
          <View>
            <EventList
              events={events}
              onEventPress={onEventPress}
              onTagPress={(tag) => console.log("Tag pressed:", tag)}
            />
          </View>
        )}
        {events.length === 0 && !loading && <Text>{t("no_events_found")}</Text>}
        <Pressable
          onPress={() => {
            console.log("Navigating to create event");
            router.push("/(tabs)/createEvent");
          }}
        >
          <Text>{t("create_event")}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            console.log("User logout pressed");
            logOut();
            router.replace("/(auth)/login");
          }}
        >
          <Text>{t("logout")}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );

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
    ...GlobalStyles.container,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  welcomeText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
});