import { addFriend, cancelFriendRequest, removeFriend } from "@/services/friendService"

export const useOnAddFriendPress = (token: string) => {
  const handleAddFriend = async (userId: string) : Promise<boolean> => {
    try {
      await addFriend(token, userId);
      return true;
    } catch (error) {
      console.error("Error adding friend:", error);
      return false;
    }
  };

  return handleAddFriend;
}

export const useOnCancelFriendRequestPress = (token: string) => {
  const handleCancelFriendRequest = async (userId: string) : Promise<boolean> => {
    try {
      await cancelFriendRequest(token, userId);
      return true;
    } catch (error) {
      console.error("Error cancelling friend request:", error);
      return false;
    }
  };

  return handleCancelFriendRequest;
}

export const useOnRemoveFriendPress = (token: string) => {
  const handleRemoveFriend = async (userId: string) : Promise<boolean> => {
    try {
      await removeFriend(token, userId);
      return true;
    } catch (error) {
      console.error("Error removing friend:", error);
      return false;
    }
  };

  return handleRemoveFriend;
}