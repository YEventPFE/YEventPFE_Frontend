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

export async function getValueFor<T>(key:string) : Promise<T> {
  try {
    if (Platform.OS === 'web') {
      const value = await AsyncStorage.getItem(key);
      return value as T;
    }
    const value = await SecureStore.getItemAsync(key);
    return value as T;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
  return null as T;
}