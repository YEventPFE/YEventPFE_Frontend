import React, { useState, } from "react";
import { Platform, View, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePickerWeb from "react-datepicker";
import GlobalStyles from "@/styles/global";
if (Platform.OS === "web") {
  require("react-datepicker/dist/react-datepicker.css");
}

interface CrossPlatformDatePickerProps {
  date: Date;
  onChange: (date: Date) => void;
  placeholderText?: string;
  showYearDropdown?: boolean;
  showTimeSelect?: boolean;
}
export default function CrossPlatformDatePicker({
  date,
  onChange,
  placeholderText,
  showYearDropdown,
  showTimeSelect,
}: CrossPlatformDatePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  if (Platform.OS === "web") {
    return (
      <div style={styles.datePicker}>
        <DatePickerWeb
          selected={date}
          placeholderText={placeholderText}
          showTimeSelect={showTimeSelect}
          timeIntervals={30}
          dateFormat={showTimeSelect ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}
          showYearDropdown={showYearDropdown}
          onChange={(d: Date | null) => {
            if (d) onChange(d);
          }}
        />
      </div>
    );
  }

  if (Platform.OS === "android") {
    return (
      <View style={styles.datePicker}>
        <Button
          color={styles.button.backgroundColor}
          title={
            showTimeSelect
              ? date.toLocaleString()
              : date.toDateString()
          }
          onPress={() => setShowDatePicker(true)}
        />

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            locale="fr-FR"
            onChange={(_, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                if (showTimeSelect) {
                  // Keep the selected date, but wait for time
                  const updatedDate = new Date(selectedDate);
                  setTimeout(() => setShowTimePicker(true), 0);
                  onChange(updatedDate);
                } else {
                  onChange(selectedDate);
                }
              }
            }}
          />
        )}

        {showTimeSelect && showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={(_, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) {
                const updatedDate = new Date(date);
                updatedDate.setHours(selectedTime.getHours());
                updatedDate.setMinutes(selectedTime.getMinutes());
                onChange(updatedDate);
              }
            }}
          />
        )}
      </View>
    );
  }

  // iOS
  return (
    <View style={styles.datePicker}>
      <DateTimePicker
        value={date}
        mode={showTimeSelect ? "datetime" : "date"}
        display="default"
        onChange={(_, selectedDate) => {
          if (selectedDate) onChange(selectedDate);
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
      ...GlobalStyles.button,
    },
    datePicker: {
        padding: 10,
    },
    dateText: {
        fontSize: 16,
        color: "#333",
    },
});