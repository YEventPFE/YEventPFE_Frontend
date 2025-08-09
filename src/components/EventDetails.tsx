import { EventDTO } from "@/dto/eventDTO";
import { View, Text,StyleSheet, Pressable, ScrollView } from "react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import { useTranslation } from "react-i18next";
import CommentList from "./CommentList";
import { CommentListProps } from "./CommentList";
import { CommentDTO } from "@/dto/commentDTO";
import { useState } from "react";
import CommentInputs from "./CommentInputs";

type EventDetailsProps = {
    event: EventDTO,
    onTagPress?: (tag: string) => void,
    onUserPress?: (userId: string) => void,
    onComment?: (event: EventDTO, commentText: string) => Promise<CommentDTO>,
    onReplyToComment?: (comment: CommentDTO, replyText: string) => Promise<CommentDTO>
};

export default function EventDetails({ 
    event: event, 
    onTagPress: onTagPress, 
    onUserPress: onUserPress,
    onComment: onComment,
    onReplyToComment: onReplyToComment 
}: EventDetailsProps) {
    const { t } = useTranslation();

    return (
      <View style={styles.container}>
        <View>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <Text style={styles.eventDate}>
            {event.startDate} - {event.endDate}
            </Text>
            <Text style={styles.eventLocation}>
            {t("location") + " : "}
            {event.location}
            </Text>
            <Pressable onPress={() => onUserPress?.(event.owner.id)}>
            <Text style={styles.eventOwner}>
                {t("owner") + " : "}
                {event.owner.name}
            </Text>
            </Pressable>
            {onComment && <CommentInputs event={event} onComment={onComment} />}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {event.tags.map((tag) => (
            <Pressable key={tag} onPress={() => onTagPress?.(tag)}>
              <Text style={styles.tag}>#{tag}</Text>
            </Pressable>
          ))}
        </View>
        <CommentList
          comments={event.comments}
          onUserPress={onUserPress}
          onReply={onReplyToComment}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: Colors.container.background,
    },
    eventName: {
        ...Typography.title,
        marginBottom: 8,
    },
    eventDescription: {
        ...Typography.body,
        marginBottom: 8,
    },
    eventDate: {
        ...Typography.body,
        marginBottom: 8,
    },
    eventLocation: {
        ...Typography.body,
        marginBottom: 8,
    },
    eventOwner: {
        ...Typography.body,
        marginBottom: 8,
    },
    tag: {
        ...Typography.tag,
        marginRight: 8,
    },
});