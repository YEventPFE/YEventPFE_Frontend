// DatePicker.tsx
import React, { useState, } from "react";
import { Platform, View, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePickerWeb from "react-datepicker";

interface Props {
  date: Date;
  onChange: (date: Date) => void;
  placeholderText?: string;
  showYearDropdown?: boolean;
}

export default function CrossPlatformDatePicker({ date, onChange, placeholderText, showYearDropdown }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  if (Platform.OS === "web") {
    return (
      <div style={styles.datePicker}>
        <DatePickerWeb
            selected={date}
            placeholderText={placeholderText}
            showYearDropdown={showYearDropdown}
            onChange={(date: Date | null) => {
                if (date) {
                onChange(date);
                }
                setShowPicker(false);
            }}
            dateFormat="yyyy-MM-dd"
        />
      </div>
    );
  }

  return (
    <View style={styles.datePicker}>
      <Button color={styles.button.backgroundColor} title={date.toDateString()} onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    datePicker: {
        padding: 10,
    },
    dateText: {
        fontSize: 16,
        color: "#333",
    },
});