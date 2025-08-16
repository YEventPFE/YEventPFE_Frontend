import { UserDTO, UserListDTO, UserProfileDTO } from "@/dto/userDTO";
import { View, Text } from "react-native";
import FriendItem from "@/components/friends/FriendItem";
import { useState } from "react";

type FriendListProps = {
  friends: UserListDTO;
  onRemove: (id: string) => Promise<boolean>;
  onPress: (id: string) => void;
};

const FriendList: React.FC<FriendListProps> = ({ friends, onRemove, onPress }) => {
    const [friendList, setFriendList] = useState<UserDTO[]>(friends.members);
    const handleRemove = async (id: string) : Promise<boolean> => {
        const success = await onRemove(id);
        if (success) {
            setFriendList((prev) => prev.filter((friend) => friend.id !== id));
        }
        return success;
    };

    if (friendList.length === 0) {
        return <View><Text>No friends found</Text></View>;
    }

    return (
        <View>
            {friendList.map((friend) => (
                <FriendItem key={friend.id} friend={friend} onRemove={handleRemove} onPress={onPress} />
            ))}
        </View>
    );
};
export default FriendList;