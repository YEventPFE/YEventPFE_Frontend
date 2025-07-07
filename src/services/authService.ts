export const login = async (username: string, password: string) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  var body = JSON.stringify({ username, password })
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json();
};
