import { UserProfileDTO } from "@/dto/userDTO";

export const getUserProfile = async (token: string, userId: string): Promise<UserProfileDTO> => {
    if (!token || !userId) {
        throw new Error('Token and userId are required');
    }

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    if (!apiUrl) {
        throw new Error('API URL is not defined');
    }

    const response = await fetch(`${apiUrl}/Users/Profile/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user profile');
    }

    const userProfile: UserProfileDTO = await response.json();
    return userProfile;
}