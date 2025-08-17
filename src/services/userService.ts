import { UserProfileDTO } from "@/dto/userDTO";
import { normalizeDotNetJson } from "@/utils/deserializeHelper";

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
        const bodyMessage = await response.text();
        throw new Error('Failed to fetch user profile: ' + bodyMessage);
    }

    const rawJson : UserProfileDTO = await response.json();
    const deserializedResponse: UserProfileDTO = normalizeDotNetJson<UserProfileDTO>(rawJson);
    return deserializedResponse;
}