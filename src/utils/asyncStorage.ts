import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export async function save(key : string, value: string) : Promise<void> {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value.toString());
    }
  } catch (error) {
    console.error("Error saving data:", error); 
  }
}

export async function getValueFor(key:string) : Promise<any> {
  try {
    if (Platform.OS === 'web') {
      const value = await AsyncStorage.getItem(key);
      return value;
    }
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}