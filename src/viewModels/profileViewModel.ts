import { UserProfileDTO } from "@/dto/userDTO";
import { getUserProfile } from "@/services/userService";
import { getUser } from "./authViewModel";
import { Router } from "expo-router/build/exports";


export const fetchUserProfile = async (userId: string): Promise<UserProfileDTO> => {
    const user = await getUser();
    const token = user?.token;
    if (!token) {
        throw new Error('User is not authenticated');
    }

    return getUserProfile(token, userId);
}

export const fetchAndSetUserProfile = async (userId: string, setUserProfile: (profile: UserProfileDTO | undefined) => void) => {
    try {
        const profile = await fetchUserProfile(userId);
        setUserProfile(profile);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}