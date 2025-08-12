import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import EventDetails from "@/components/events/EventDetails";
import { router, useLocalSearchParams } from "expo-router";
import { getEventById } from "@/services/eventService";
import { EventDTO } from "@/dto/eventDTO";
import { useEffect, useState } from "react";
import { UserDTO } from "@/dto/userDTO";
import { fetchUserAndRedirect, getUser } from "@/viewModels/authViewModel";
import { onUserPress, useContextEvent } from "@/viewModels/navigationViewModel";
import { CommentDTO } from "@/dto/commentDTO";
import { addComment, replyToComment } from "@/viewModels/eventViewModel";

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
    const selectedEventId = selectedEvent?.id

    if (selectedEvent && selectedEventId === paramId) {
      console.debug("Using event from context:", selectedEvent);
      setEventDetail(selectedEvent);
    } else {
      console.debug(`Fetching event with ID: ${id}`);
      setLoading(true);
      getEventById(id)
        .then((event) => {
          if (event) {
            console.debug("Event fetched successfully:", event);
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
      <EventDetails event={eventDetail} onUserPress={onUserPress} onComment={handleAddComment} onReplyToComment={handleReplyToComment} />
    </ScrollView>
  );

  async function handleAddComment(event: EventDTO, commentText: string): Promise<CommentDTO> {
    try {
      const newComment = await addComment({ eventId: event.id, content: commentText });
      return newComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

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
