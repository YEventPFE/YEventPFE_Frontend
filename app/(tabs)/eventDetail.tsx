import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import EventDetails from "@/components/EventDetails";
import { router, useLocalSearchParams } from "expo-router";
import { getEventById } from "@/services/eventService";
import { EventDTO } from "@/dto/eventDTO";
import { useEffect, useState } from "react";
import { UserDTO } from "@/dto/userDTO";
import { fetchUserAndRedirect, getUser } from "@/viewModels/authViewModel";
import { onUserPress, useContextEvent } from "@/viewModels/navigationViewModel";
import { CommentDTO } from "@/dto/commentDTO";
import { replyToComment } from "@/viewModels/eventViewModel";

export default function EventDetail() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const selectedEvent = useContextEvent();
  const [user, setUser] = useState<{ token: string , user: UserDTO } | undefined>(undefined);
  const [eventDetail, setEventDetail] = useState<EventDTO | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserAndRedirect(router, setUser);

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
    <ScrollView style={styles.container}>
      <EventDetails event={eventDetail} onUserPress={onUserPress} onReplyToComment={handleReplyToComment} />
    </ScrollView>
  );
  
  async function handleReplyToComment(comment: CommentDTO, replyText: string): Promise<CommentDTO> {
    try {
      const newComment = await replyToComment({ commentId: comment.id, content: replyText });
      return newComment;
    } catch (error) {
      console.error('Error adding reply:', error);
      throw error;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
