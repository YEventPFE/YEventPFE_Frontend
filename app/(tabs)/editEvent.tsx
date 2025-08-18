import EditEventForm from "@/components/events/EditEventForm";
import { EventDTO } from "@/dto/eventDTO";
import { UserDTO } from "@/dto/userDTO";
import GlobalStyles from "@/styles/global";
import { fetchUserAndRedirect } from "@/viewModels/authViewModel";
import { useContextEvent, useNavigateToEvent } from "@/viewModels/navigationViewModel";
import { editEvent } from "@/viewModels/eventViewModel";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function EditEvent() {
  const { t } = useTranslation();
  const [user, setUser] = useState<{ token: string, user: UserDTO } | undefined>(undefined);
  const [eventDetail, setEventDetail] = useState<EventDTO | null>(null);
  const selectedEvent = useContextEvent();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const navigateToEvent = useNavigateToEvent();

useEffect(() => {
    const load = async () =>{
        fetchUserAndRedirect(router, setUser);

        if (selectedEvent) {
            setEventDetail(selectedEvent);
        }
        setLoading(false);
    }

    load();
}, []);

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

  const onSubmit = async (event: EventDTO) : Promise<EventDTO> => {
    console.debug("Submitting edited event:", event);
    const dto = await editEvent(event);
    navigateToEvent(dto);
    return dto;
  }

  return (
    <ScrollView style={styles.container}>
      <EditEventForm event={eventDetail} onSubmit={onSubmit} />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
});
