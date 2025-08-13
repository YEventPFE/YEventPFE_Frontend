import { UserListDTO, UserDTO } from "@/dto/userDTO";

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

export const addFriend = async (token: string, friendId: string): Promise<void> => {
    if (!token || !friendId) {
        throw new Error('Token and friendId are required');
    }

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    if (!apiUrl) {
        throw new Error('API URL is not defined');
    }
    const response = await fetch(`${apiUrl}/Friend/Add?friendId=${friendId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Error('Failed to add friend');
    }
}

export const cancelFriendRequest = async (token: string, friendId: string): Promise<void> => {
    if (!token || !friendId) {
        throw new Error('Token and friendId are required');
    }

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    if (!apiUrl) {
        throw new Error('API URL is not defined');
    }
    const response = await fetch(`${apiUrl}/Friend/CancelRequest?friendId=${friendId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    });

    console.log("response code :", response.status)
    if (!response.ok) {
        throw new Error('Failed to cancel friend request');
    }
}

export const removeFriend = async (token: string, friendId: string): Promise<void> => {
    if (!token || !friendId) {
        throw new Error('Token and friendId are required');
    }

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    if (!apiUrl) {
        throw new Error('API URL is not defined');
    }
    const response = await fetch(`${apiUrl}/Friend/Remove?friendId=${friendId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Error('Failed to remove friend');
    }
}