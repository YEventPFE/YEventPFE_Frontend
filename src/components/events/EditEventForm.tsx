import { EventDTO } from "@/dto/eventDTO";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import {Checkbox} from "expo-checkbox";
import CrossPlatformDatePicker from "@/components/CrossPlatformDatePicker";
import GlobalStyles from "@/styles/global";

type EditEventFormProps = {
  event: EventDTO;
  onSubmit: (event: EventDTO) => Promise<EventDTO>;
};


export default function EditEventForm({
    event,
    onSubmit
}: EditEventFormProps) {

    const [title, setTitle] = useState(event.name);
    const [description, setDescription] = useState(event.description);
    const [startDate, setStartDate] = useState<Date>(new Date(event.startDate));
    const [endDate, setEndDate] = useState<Date>(new Date(event.endDate));
    const [location, setLocation] = useState<string>(event.location);
    const [tags, setTags] = useState<string[]>(event.tags);
    const [isMature, setIsMature] = useState<boolean>(event.isMature);

    const [loadingEdit, setLoadingEdit] = useState<boolean>(false);


    const { t } = useTranslation();
    return (
      <View style={styles.container}>
        <View style={styles.form}>
            <TextInput
                style={styles.textInput}
                placeholder={t('event_name')}
                value={title}
                onChangeText={(text) => setTitle(text)}
                />
            <TextInput
                style={styles.textInput}
                placeholder={t('event_description')}
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <CrossPlatformDatePicker
                date={startDate}
                onChange={(date: Date) => setStartDate(date)}
                placeholderText={t('event_start_date')}
                showTimeSelect={true}
            />
            <CrossPlatformDatePicker
                date={endDate}
                onChange={(date: Date) => setEndDate(date)}
                placeholderText={t('event_end_date')}
                showTimeSelect={true}
            />
            <TextInput
                style={styles.textInput}
                placeholder={t('event_location')}
                value={location}
                onChangeText={(text) => setLocation(text)}
            />
            <TextInput
                style={styles.textInput}
                placeholder={t('event_tags')}
                value={tags.join(', ')}
                onChangeText={(text) => setTags(text.split(',').map(tag => tag.trim()))}
            />
            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={isMature}
                    onValueChange={setIsMature}
                />
                <Text>{t('event_is_mature')}</Text>
            </View>
        </View>
        {
            loadingEdit ? (
                <Text>{t('loading')}</Text>
            ) : (
                <Pressable
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text>{t('save_changes')}</Text>
                </Pressable>
            )
        }
      </View>
    );

    async function handleSubmit() {
        setLoadingEdit(true);
        const updatedEvent: EventDTO = {
            ...event,
            name: title,
            description,
            startDate: startDate.toISOString(), 
            endDate: endDate.toISOString(),
            location,
            tags,
            isMature,
        };
        await onSubmit(updatedEvent);
        setLoadingEdit(false);
    }
}


const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  form: {
    ...GlobalStyles.container,
  },
  textInput: {
    ...GlobalStyles.textInput,
  },
  button: {
    ...GlobalStyles.button,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});