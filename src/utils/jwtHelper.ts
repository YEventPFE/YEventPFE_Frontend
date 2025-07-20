export async function extractUserIdFromToken(token: string): Promise<number | null> {
  if (!token) {
    throw new Error('Token is required');
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || null;
  } catch (error) {
    console.error("Error extracting user ID from token:", error);
    return null;
  }
}