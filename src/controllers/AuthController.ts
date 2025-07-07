// Controller to a custom authentication service in React Native
import { login as serviceLogin} from '../services/authService';

export default class AuthController {
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
}