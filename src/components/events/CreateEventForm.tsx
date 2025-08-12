import React, {useEffect, useState} from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {Checkbox} from "expo-checkbox";
import {useTranslation} from "react-i18next";
import Typography from "@/constants/typography";
import GlobalStyles from "@/styles/global";
import CrossPlatformDatePicker from "@/components/CrossPlatformDatePicker";
import { CreatedEventDTO, EventDTO } from "@/dto/eventDTO";


export type CreateEventFormProps = {
  onSubmit: (
    event : CreatedEventDTO
  ) => Promise<void>;
  buttonLabel?: string;
  initialEvent?: EventDTO | null;
}


const CreateEventForm: React.FC<CreateEventFormProps> = ({
  onSubmit,
  buttonLabel = null,
  initialEvent = null
}) => {
    const {t} = useTranslation();
    if (!buttonLabel) {
        buttonLabel = t("create_event");
    }
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [location, setLocation] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [isPublic, setIsPublic] = useState(true);
    const [isMature, setIsMature] = useState(false);
    
    const [loadingCreation, setLoadingCreation] = useState(false);
    
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialEvent) {
            setTitle(initialEvent.name);
            setDescription(initialEvent.description);
            setStartDate(new Date(initialEvent.startDate));
            setEndDate(new Date(initialEvent.endDate));
            setLocation(initialEvent.location);
        }
    }, [initialEvent]);

    const handleCreateEvent = async () => {
        setError(null);
        setLoadingCreation(true);
        try {
            const filteredTags = tags.filter(tag => tag.trim() !== "");
            await onSubmit({name: title, description, startDate: startDate!, endDate: endDate!, location, tags: filteredTags, isPublic, isMature});
        } catch (err: any) {
            setError(err.message || "Event creation failed");
        } finally {
            setLoadingCreation(false);
        }
    };

    return (
      <View style={styles.container}>
        <TextInput
          placeholder={t("event_title")}
          value={title}
          onChangeText={setTitle}
          autoCapitalize="none"
          style={styles.input}/>
        <TextInput
          placeholder={t("event_description")}
          value={description}
          onChangeText={setDescription}
          style={styles.input}/>
        <CrossPlatformDatePicker
          date={startDate || new Date()}
          onChange={setStartDate}
          placeholderText={t("event_date")}
          showTimeSelect={true}
          showYearDropdown={false}/>
        <CrossPlatformDatePicker
          date={endDate || new Date()}
          onChange={setEndDate}
          placeholderText={t("event_end_date")}
          showTimeSelect={true}
          showYearDropdown={false}/>
        <TextInput
          placeholder={t("event_location")}
          value={location}
          onChangeText={setLocation}
          style={styles.input}/>
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          placeholder={t("event_tags")}
          value={tags.join(",")}
          onChangeText={(text) => setTags(text.split(",").map(tag => tag.trim()))}
          style={styles.input}
        />
        <View>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{marginRight: 8}}>{t("event_public")}</Text>
            <Checkbox
              value={isPublic}
              onValueChange={setIsPublic}
            />
          </View>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{marginRight: 8}}>{t("event_mature")}</Text>
            <Checkbox
              value={isMature}
              onValueChange={setIsMature}
            />
          </View>
        </View>
        <Button
          title={buttonLabel}
          onPress={handleCreateEvent}
          disabled={loadingCreation}
        />
        {loadingCreation && <ActivityIndicator />}
      </View>
    );
};

export default CreateEventForm;

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  input: {
    ...GlobalStyles.textInput,
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    ...GlobalStyles.button,
    marginTop: 10,
  },
  error: {
    ...Typography.error,
    marginBottom: 10,
  },
});
