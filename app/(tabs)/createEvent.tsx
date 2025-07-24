import React, {useEffect, useState} from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import {useTranslation} from "react-i18next";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import GlobalStyles from "@/styles/global";
import { EventDTO, CreatedEventDTO } from "@/dto/eventDTO";
import CreateEventForm from "@/components/CreateEventForm";
import { createEvent } from "@/viewModels/eventViewModel";


export default function CreateEvent() {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateEvent = async (event: CreatedEventDTO) => {
    setLoading(true);
    setError(null);
    try {
      await createEvent(event);
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