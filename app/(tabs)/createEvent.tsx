import CreateEventForm from "@/components/events/CreateEventForm";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import { CreatedEventDTO } from "@/dto/eventDTO";
import GlobalStyles from "@/styles/global";
import { createEvent } from "@/viewModels/eventViewModel";
import { useNavigateToEvent } from "@/viewModels/navigationViewModel";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from "react-native";


export default function CreateEvent() {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigateToEventDetail = useNavigateToEvent();

  const handleCreateEvent = async (event: CreatedEventDTO) => {
    setLoading(true);
    setError(null);
    try {
      var createdEvent = await createEvent(event);
      navigateToEventDetail(createdEvent, true);
    } catch (err: any) {
      setError(err.message || "Event creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("create_event")}</Text>
      <CreateEventForm onSubmit={handleCreateEvent} />
      {loading && <ActivityIndicator />}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    padding: 16,
    backgroundColor: Colors.container.background,
  },
  title: {
    ...Typography.title,
    marginBottom: 16,
  },
  error: {
    ...Typography.error,
    marginTop: 8,
  },
});