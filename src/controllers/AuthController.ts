// Controller to a custom authentication service in React Native
import { login as serviceLogin, register as serviceRegister} from '../services/authService';

export default class AuthController {
  static token: string | null = null;

  static async login(username: string, password: string) {
    try {
      const response = await serviceLogin(username, password);

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  static async register(username: string, password: string, email: string, birthdate: Date, phoneNumber: string) {
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
}