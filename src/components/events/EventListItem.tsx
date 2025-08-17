import { useTranslation } from "react-i18next";
import { ScrollView, View, Pressable, Text } from "react-native";
import { EventListProps, style } from "./EventList";
import { StyleSheet } from "react-native";
import { EventDTO } from "@/dto/eventDTO";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import GlobalStyles from "@/styles/global";
import {formatDate} from "@/utils/dateHelper";


export type EventListDetailProps = {
    event: EventDTO,
    onEventPress?: (event: EventDTO) => void,
    onTagPress?: (tag: string) => void,
    onUserPress?: (userId: string) => void
};

export default function EventListItem({ event, onEventPress, onTagPress, onUserPress }: EventListDetailProps) {
    const { t } = useTranslation();
    
    return (
      <View key={event.id} style={styles.eventItem}>
        <Pressable onPress={() => onEventPress?.(event)}>
          <Text style={styles.eventName}>{event.name}</Text>
        </Pressable>
        <Text style={styles.eventDescription}>{event.description}</Text>
        <Text style={styles.eventDate}>
          {formatDate(new Date(event.startDate))} - {formatDate(new Date(event.endDate))}
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
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {event.tags.map((tag) => (
            <Pressable key={tag} onPress={() => onTagPress?.(tag)}>
              <Text style={styles.tag}>#{tag}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  eventItem: {
    ...GlobalStyles.container,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.container.accent,
  },
  eventName: {
    ...Typography.title,
  },
  eventDescription: {
    ...Typography.subtitle,
  },
  eventDate: {
    ...Typography.body,
    ...Typography.fontSize,
  },
  eventLocation: {
    ...Typography.body,
    ...Typography.fontSize,
  },
  eventOwner: {
    ...Typography.body,
    ...Typography.fontSize,
  },
  tag: {
    ...Typography.body,
    ...Typography.fontSize,
    marginRight: 5,
  },
});