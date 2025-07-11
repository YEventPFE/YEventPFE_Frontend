// Controller to a custom authentication service in React Native
import { login as serviceLogin, register as serviceRegister } from '../services/authService';


export const login = async (username: string, password: string) => { // todo specify return types
  try {
    const response = await serviceLogin(username, password);

    console.log('Login response (vm):', response);
    if (!response) {
      throw new Error('Login failed');
    }

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export const register = async (username: string, password: string, email: string, birthdate: Date, phoneNumber: string) => { //todo specify return types
  try {
    const response = await serviceRegister(username, password, email, birthdate, phoneNumber);

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}