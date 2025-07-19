// DatePicker.tsx
import React, { useState } from "react";
import { Platform, View, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePickerWeb from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  date: Date;
  onChange: (date: Date) => void;
}

export default function CrossPlatformDatePicker({ date, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  if (Platform.OS === "web") {
    return (
      <div style={{ zIndex: 100 }}>
        <DatePickerWeb
          selected={date}
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
    <View>
      <Button title={date.toDateString()} onPress={() => setShowPicker(true)} />
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
