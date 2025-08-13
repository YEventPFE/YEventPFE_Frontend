import { FriendRequestDTO } from "@/dto/friendDTO";
import { UserListDTO } from "@/dto/userDTO";
import { acceptFriendRequest, addFriend, cancelFriendRequest, declineFriendRequest, getUserFriendList, getUserRequests, removeFriend } from "@/services/friendService"

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

export const fetchAndSetPendingFriendRequests = async (token: string, setPendingRequests: (requests: FriendRequestDTO[] | null) => void) => {
  getUserRequests(token)
    .then((requests) => {
      setPendingRequests(requests);
    })
    .catch((error) => {
      console.error("Error fetching user pending friend requests:", error);
      setPendingRequests(null);
    });
};

export const useOnAcceptFriendRequest = (token: string) => {
  const handleAcceptFriendRequest = async (requestId: string): Promise<boolean> => {
    try {
      await acceptFriendRequest(token, requestId);
      return true;
    } catch (error) {
      console.error("Error accepting friend request:", error);
      return false;
    }
  };

  return handleAcceptFriendRequest;
};


export const useOnDeclineFriendRequest = (token: string) => {
  const handleDeclineFriendRequest = async (requestId: string): Promise<boolean> => {
    try {
      await declineFriendRequest(token, requestId);
      return true;
    } catch (error) {
      console.error("Error declining friend request:", error);
      return false;
    }
  };

  return handleDeclineFriendRequest;
};