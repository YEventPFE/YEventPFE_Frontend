import { login as serviceLogin, register as serviceRegister } from '../services/authService';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { save } from '../utils/asyncStorage';
import { UserDTO } from '@/dto/userListDTO';
import { LoginResponse } from '@/dto/authDTO';

interface RegisterResponse {
  success: boolean;
  message: string;
}

export const login = async (username: string, password: string) : Promise<LoginResponse> => {
  try {
    const response = await serviceLogin(username, password);

    console.log('Login response (vm):', response);
    if (!response) {
      throw new Error('Login failed');
    }
    
    saveUser(response.user, response.token);
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export const register = async (username: string, password: string, email: string, birthdate: Date, phoneNumber: string) : Promise<RegisterResponse> => {
  try {
    const response = await serviceRegister(username, password, email, birthdate, phoneNumber);

    if (!response.success) {
      throw new Error('Registration failed');
    }

    return response;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}

function saveUser(user: UserDTO, jwt: string): void {
  if (Platform.OS === 'web') {
    AsyncStorage.setItem('user', JSON.stringify(user));
    AsyncStorage.setItem('jwt', jwt);
  } else {
    SecureStore.setItemAsync('user', JSON.stringify(user));
    SecureStore.setItemAsync('jwt', jwt);
  }
}

function eraseUser(): void {
  if (Platform.OS === 'web') {
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('jwt');
  } else {
    SecureStore.deleteItemAsync('user');
    SecureStore.deleteItemAsync('jwt');
  }
}

export const getUser = async () : Promise<{ token: string, user: UserDTO } | null> => {
  try {
    if (Platform.OS === 'web') {
      const userJson = await AsyncStorage.getItem('user');
      const jwt = await AsyncStorage.getItem('jwt');
      if (userJson && jwt) {
        return { token: jwt, user: JSON.parse(userJson) };
      }
    } else {
      const userJson = await SecureStore.getItemAsync('user');
      const jwt = await SecureStore.getItemAsync('jwt');
      if (userJson && jwt) {
        return { token: jwt, user: JSON.parse(userJson) };
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export const logOut = async () : Promise<void> => {
  eraseUser();
}