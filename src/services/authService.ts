import { LoginDTO, LoginResponse, RegisterDTO, RegisterResponse } from "@/dto/authDTO";


export const login = async (name: string, password: string): Promise<LoginResponse> => {
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

  //parse 'userDto' from response
  const jsonResponse = await response.json();
  console.log('Parsed response:', jsonResponse);
  const userDto = jsonResponse.userDto;
  if (!userDto || !userDto.name) {
    throw new Error('Invalid response from server');
  }
  const responseName = userDto.name;
  const responseId = userDto.id;
  const token = jsonResponse.token;


  if (!token) {
    throw new Error('Token not found in response');
  }


  return {
    token: token,
    user: {
      id: responseId,
      name: responseName
    }
  }
};

export const register = async (name: string, password: string, email: string, birthdate: Date, phoneNumber: string) : Promise<RegisterResponse> => {
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

  return {
    success: true,
    message: 'Registration successful'
  };
}
