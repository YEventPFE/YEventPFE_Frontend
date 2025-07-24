import { addFriend } from "@/services/friendService"

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