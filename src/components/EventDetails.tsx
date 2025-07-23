import { EventDTO } from "@/dto/eventDTO";
import { View, Text,StyleSheet, Pressable, ScrollView } from "react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import { useTranslation } from "react-i18next";

type EventDetailsProps = {
    event: EventDTO,
    onTagPress?: (tag: string) => void
};

export default function EventDetails({ event, onTagPress }: EventDetailsProps) {
    const { t } = useTranslation();
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <Text style={styles.eventDate}>{event.startDate} - {event.endDate}</Text>
            <Text style={styles.eventLocation}>{t('location') + " : "}{event.location}</Text>
            <Text style={styles.eventOwner}>{t('owner') + " : "}{event.ownerId}</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {event.tags.map(tag => (
                    <Pressable key={tag} onPress={() => onTagPress?.(tag)}>
                        <Text style={styles.tag}>#{tag}</Text>
                    </Pressable>
                ))}
            </View>
        </ScrollView>
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