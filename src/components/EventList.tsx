import { EventDTO } from "@/dto/eventDTO";
import { View, Text,StyleSheet, Pressable, ScrollView } from "react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";

type EventListProps = {
    events: EventDTO[],
    onEventPress?: (event: EventDTO) => void,
    onTagPress?: (tag: string) => void
    };


export default function EventList({ events, onEventPress, onTagPress }: EventListProps) {
    return (
        <ScrollView style={style.container}>
            {events.map(event => (
                <View key={event.id} style={style.eventItem}>
                   <Pressable onPress={() => onEventPress?.(event)}>
                       <Text style={style.eventName}>{event.name}</Text>
                   </Pressable>
                        <Text style={style.eventDescription}>{event.description}</Text>
                        <Text style={style.eventDate}>{event.startDate} - {event.endDate}</Text>
                        <Text style={style.eventLocation}>Location: {event.location}</Text>
                        <Text style={style.eventOwner}>{event.ownerId}</Text>
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
        backgroundColor: Colors.background,
        borderRadius: 10,
    },
    eventItem: {
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: Colors.accent,
    },
    eventName: {
        ...Typography.fontFamily,
        ...Typography.fontSize,
        color: Colors.primary,
    },
    eventDescription: {
        ...Typography.fontFamily,
        ...Typography.fontSize,
        color: Colors.primary,
    },
    eventDate: {
        ...Typography.fontFamily,
        ...Typography.fontSize,
        color: Colors.primary,
    },
    eventLocation: {
        ...Typography.fontFamily,
        ...Typography.fontSize,
        color: Colors.primary,
    },
    eventOwner: {
        ...Typography.fontFamily,
        ...Typography.fontSize,
        color: Colors.primary,
    },
    tag: {
        ...Typography.fontFamily,
        ...Typography.fontSize,
        color: Colors.primary,
        marginRight: 5,
    },
})