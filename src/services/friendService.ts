import { UserListDTO, UserDTO } from "@/dto/userListDTO";

export const getUserFriendList = async (token: string): Promise<UserListDTO> => {
    if (!token) {
        throw new Error('Token is required');
    }

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    if (!apiUrl) {
        throw new Error('API URL is not defined');
    }

    const response = await fetch(`${apiUrl}/Friend/Friendlist`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user list');
    }

    const userList: UserListDTO = await response.json();
    return userList;
};

export const addFriend = async (token: string, userId: string): Promise<void> => {
    if (!token || !userId) {
        throw new Error('Token and userId are required');
    }

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    if (!apiUrl) {
        throw new Error('API URL is not defined');
    }

    const response = await fetch(`${apiUrl}/Friend/Add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ userId })
    });

    if (!response.ok) {
        throw new Error('Failed to add friend');
    }
}