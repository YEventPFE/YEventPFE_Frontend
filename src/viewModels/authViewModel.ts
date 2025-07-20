import { login as serviceLogin, register as serviceRegister } from '../services/authService';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { save } from '../utils/asyncStorage';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
  };
}

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
    
    save('jwt', response.token);
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