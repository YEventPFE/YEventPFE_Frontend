type LoginDTO = {
  name: string;
  password: string;
}

type RegisterDTO = {
    name: string;
    password: string;
    email: string;
    birthdate: Date;
    phoneNumber: string;
};

export const login = async (name: string, password: string) => {
  if (!name || !password) {
    throw new Error('Username and password are required');
  }
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }
  const loginDto: LoginDTO = { name, password };
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

export const register = async (name: string, password: string, email: string, birthdate: Date, phoneNumber: string) => {
  if (!name || !password || !email || !birthdate || !phoneNumber) {
    throw new Error('All fields are required');
  }
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }
  const registerDto : RegisterDTO =  { name, password, email, birthdate, phoneNumber };
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
