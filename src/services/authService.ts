class LoginDto{
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

class RegisterDto {
  username: string;
  password: string;
  email: string;
  birthdate: Date;
  phoneNumber: string;

  constructor(username: string, password: string, email: string, birthdate: Date, phoneNumber: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.birthdate = birthdate;
    this.phoneNumber = phoneNumber;
  }
}

export const login = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }
  var loginDto = new LoginDto(username, password);
  // Convert the DTO to JSON
  var body = JSON.stringify(loginDto);
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  console.log('Login response:', response);
  return await response.json();
};

export const register = async (username: string, password: string, email: string, birthdate: Date, phoneNumber: string) => {
  if (!username || !password || !email || !birthdate || !phoneNumber) {
    throw new Error('All fields are required');
  }
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }
  var registerDto = new RegisterDto(username, password, email, birthdate, phoneNumber);
  // Convert the DTO to JSON
  var body = JSON.stringify(registerDto);
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return await response.json();
}
