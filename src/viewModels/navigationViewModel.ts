import { useEventContext } from "@/context/EventContext";
import { EventDTO } from "@/dto/eventDTO";
import { router } from "expo-router/build/exports";

export const onUserPress = (userId: string) => {
    router.push({
        pathname: '/(tabs)/userProfile',
        params: { id: userId }
    });
}

export const UseOnEventPress = () => {
    const { setSelectedEvent } = useEventContext();
    return (event: EventDTO) => {
        setSelectedEvent(event);
        router.push({
            pathname: '/(tabs)/eventDetail',
            params: { id: event.id }
        });
    }
}

export const useContextEvent = (): EventDTO | null => {
    const { selectedEvent } = useEventContext();
    return selectedEvent;
}