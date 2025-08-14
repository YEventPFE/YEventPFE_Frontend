import { UserDTO, UserProfileDTO } from "@/dto/userDTO";
import { Button, Pressable, Text, View } from "react-native";

type FriendItemProps = {
  friend: UserDTO;
  onRemove: (id: string) => Promise<boolean>;
  onPress: (id: string) => void;
};

const FriendItem: React.FC<FriendItemProps> = ({ friend, onRemove, onPress }) => {
    return (
        <View>
            <Text onPress={() => onPress(friend.id)}>{friend.name}</Text>
            <Pressable onPress={() => onRemove(friend.id)}>
                <Text>Remove</Text>
            </Pressable>
        </View>
    );
};
export default FriendItem;