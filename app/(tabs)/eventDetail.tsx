import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";
import EventDetails from "@/components/EventDetails";
import { useLocalSearchParams } from "expo-router";
import { useEventContext } from "@/context/EventContext";
import { getEventById } from "@/services/eventService";
import { EventDTO } from "@/dto/eventDTO";
import { useEffect, useState } from "react";

export default function EventDetail() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { selectedEvent } = useEventContext();
  const [eventDetail, setEventDetail] = useState<EventDTO | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      console.error("No event ID provided in search params.");
      return;
    }
    const paramId = parseInt(id as string, 10);
    const selectedEventId = parseInt(selectedEvent?.id as string, 10);

    if (selectedEvent && selectedEventId === paramId) {
      console.log("Using event from context:", selectedEvent);
      setEventDetail(selectedEvent);
    } else {
      console.log(`Fetching event with ID: ${id}`);
      setLoading(true);
      getEventById(id)
        .then((event) => {
          if (event) {
            console.log("Event fetched successfully:", event);
            setEventDetail(event);
          } else {
            console.error(`No event found with ID: ${id}`);
          }
        })
        .catch((error) => {
          console.error("Error fetching event:", error);
        }).finally(() => {
          setLoading(false);
        });
    }
  }, [id]);
  
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>{t('loading_event_details')}</Text>
      </View>
    );
  }
  if (!eventDetail) {
    return (
      <View style={styles.container}>
        <Text>{t('event_not_found')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <EventDetails event={eventDetail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
