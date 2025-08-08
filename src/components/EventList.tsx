import { EventDTO } from "@/dto/eventDTO";
import { Pressable, ScrollView, StyleSheet, View, Text } from "react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import { useTranslation } from "react-i18next";
import EventListItem from "./EventListItem";

export type EventListProps = {
    events: EventDTO[],
    onEventPress?: (event: EventDTO) => void,
    onTagPress?: (tag: string) => void,
    onUserPress?: (userId: string) => void
    };

export default function EventList({ events, onEventPress, onTagPress, onUserPress }: EventListProps) {
    const { t } = useTranslation();
    return (
        <ScrollView style={style.container}>
            {events.map(eventItem => (
                <EventListItem
                    key={eventItem.id}
                    event={eventItem}
                    onEventPress={onEventPress}
                    onTagPress={onTagPress}
                    onUserPress={onUserPress}
                />
            ))}
        </ScrollView>
    );
}


export const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.container.background,
        borderRadius: 10,
    },
    eventItem: {
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
})