import { useTranslation } from "react-i18next";
import { ScrollView, View, Pressable, Text } from "react-native";
import { EventListProps, style } from "./EventList";
import { EventDTO } from "@/dto/eventDTO";


export type EventListDetailProps = {
    event: EventDTO,
    onEventPress?: (event: EventDTO) => void,
    onTagPress?: (tag: string) => void,
    onUserPress?: (userId: string) => void
    };

export default function EventListItem({ event, onEventPress, onTagPress, onUserPress }: EventListDetailProps) {
    const { t } = useTranslation();
    console.log(event);
    return (
      <View key={event.id} style={style.eventItem}>
        <Pressable onPress={() => onEventPress?.(event)}>
          <Text style={style.eventName}>{event.name}</Text>
        </Pressable>
        <Text style={style.eventDescription}>{event.description}</Text>
        <Text style={style.eventDate}>
          {event.startDate} - {event.endDate}
        </Text>
        <Text style={style.eventLocation}>
          {t("location") + " : "}
          {event.location}
        </Text>
        <Pressable onPress={() => onUserPress?.(event.owner.id)}>
          <Text style={style.eventOwner}>
            {t("owner") + " : "}
            {event.owner.name}
          </Text>
        </Pressable>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {event.tags.map((tag) => (
            <Pressable key={tag} onPress={() => onTagPress?.(tag)}>
              <Text style={style.tag}>#{tag}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
}
