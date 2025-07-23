import { EventDTO } from "@/dto/eventDTO";
import { View, Text,StyleSheet, Pressable, ScrollView } from "react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import { useTranslation } from "node_modules/react-i18next";

type EventListProps = {
    events: EventDTO[],
    onEventPress?: (event: EventDTO) => void,
    onTagPress?: (tag: string) => void,
    onUserPress?: (userId: string) => void
    };


export default function EventList({ events, onEventPress, onTagPress, onUserPress }: EventListProps) {
    const { t } = useTranslation();
    return (
        <ScrollView style={style.container}>
            {events.map(event => (
                <View key={event.id} style={style.eventItem}>
                   <Pressable onPress={() => onEventPress?.(event)}>
                       <Text style={style.eventName}>{event.name}</Text>
                   </Pressable>
                        <Text style={style.eventDescription}>{event.description}</Text>
                        <Text style={style.eventDate}>{event.startDate} - {event.endDate}</Text>
                        <Text style={style.eventLocation}>{t('location') + " : "}{event.location}</Text>
                        <Pressable onPress={() => onUserPress?.(event.owner.id)}>
                            <Text style={style.eventOwner}>{t('owner') + " : "}{event.owner.name}</Text>
                        </Pressable>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {event.tags.map(tag => (
                                <Pressable key={tag} onPress={() => onTagPress?.(tag)}>
                                    <Text style={style.tag}>#{tag}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                ))}
        </ScrollView>
    );
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.container.background,
        borderRadius: 10,
    },
    eventItem: {
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
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