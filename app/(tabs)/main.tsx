import FadeInView from "@/animations/FadeInView";
import AppTitle from "@/components/AppTitle";
import EventList from "@/components/events/EventList";
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
import Toast from "react-native-toast-message";

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
    <FadeInView style={{ flex: 1 }} duration={2000}>
      <ScrollView>
        <View style={styles.container}>
          <AppTitle showSubtitle={true} userName={user?.user.name} />
          {events.length > 0 ? (
            <EventList
              events={events}
              onEventPress={onEventPress}
              onTagPress={(tag) => console.debug("Tag pressed:", tag)}
            />
          ) : (
            <Text>{t("no_events_found")}</Text>
          )}
        <Pressable
          style={styles.createEventButton}
          onPress={() => {
            console.debug("Navigating to create event");
            router.push("/(tabs)/createEvent");
          }}
        >
          <Text>{t("create_event")}</Text>
        </Pressable>
        <Pressable
          style={styles.logOutButton}
          onPress={() => {
            logOut();
            router.replace("/(auth)/login");
          }}
        >
          <Text>{t("logout")}</Text>
        </Pressable>
        <Pressable
          style={styles.logOutButton}
          onPress={() => {
            router.push("/(tabs)/friendRequests");
          }}
        >
          <Text>{t("friend_requests")}</Text>
        </Pressable>
        <Pressable
          style={styles.logOutButton}
          onPress={() => {
            router.push("/(tabs)/myFriendlist");
          }}
        >
          <Text>{t("my_friends")}</Text>
        </Pressable>
      </View>
    </ScrollView>
    </FadeInView>
  );


  async function fetchRandomEvents() {
    console.debug("Fetching random events...");
    setLoading(true);
    try {
      const randomEvents = await getRandomEvents(6);
      setEvents(randomEvents);
    } catch (error) {
      console.error("Error fetching random events:", error);
      Toast.show({
        type: 'error',
        text1: t('error_fetching_events'),
        text2: (error as Error).message || t('please_try_again_later'),
      });
    } finally {
      setLoading(false);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  createEventButton: {
    ...GlobalStyles.button,
    margin: 8,
  },
  logOutButton: {
    ...GlobalStyles.button,
    margin: 8,
  }
});