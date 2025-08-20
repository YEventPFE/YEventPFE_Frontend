import { EventDTO } from "@/dto/eventDTO";
import { StyleSheet, View } from "react-native";
import Colors from "@/constants/colors";
import { useTranslation } from "react-i18next";
import EventListItem from "./EventListItem";
import GlobalStyles from "@/styles/global";

export type EventListProps = {
    events: EventDTO[],
    onEventPress?: (event: EventDTO) => void,
    onTagPress?: (tag: string) => void,
    onUserPress?: (userId: string) => void
    };

export default function EventList({ events, onEventPress, onTagPress, onUserPress }: EventListProps) {
    const { t } = useTranslation();
    return (
        <View style={style.container}>
            {events.map(eventItem => (
                <EventListItem
                    key={eventItem.id}
                    event={eventItem}
                    onEventPress={onEventPress}
                    onTagPress={onTagPress}
                    onUserPress={onUserPress}
                />
            ))}
        </View>
    );
}


export const style = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        padding: 10,
        backgroundColor: Colors.container.background,
        borderRadius: 10,
    },
})