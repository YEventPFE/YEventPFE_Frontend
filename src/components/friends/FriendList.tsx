import { UserDTO, UserListDTO } from "@/dto/userDTO";
import { View, Text, StyleSheet} from "react-native";
import FriendItem from "@/components/friends/FriendItem";
import { useState } from "react";
import GlobalStyles from "@/styles/global";
import { useTranslation } from "react-i18next";

type FriendListProps = {
  friends: UserListDTO;
  onRemove: (id: string) => Promise<boolean>;
  onPress: (id: string) => void;
};

const FriendList: React.FC<FriendListProps> = ({ friends, onRemove, onPress }) => {
    const { t } = useTranslation();
    const [friendList, setFriendList] = useState<UserDTO[]>(friends.members);
    const handleRemove = async (id: string) : Promise<boolean> => {
        const success = await onRemove(id);
        if (success) {
            setFriendList((prev) => prev.filter((friend) => friend.id !== id));
        }
        return success;
    };

    if (friendList.length === 0) {
        return <View><Text>{t('no_friends_found')}</Text></View>;
    }

    return (
        <View style={styles.container}>
            {friendList.map((friend) => (
                <FriendItem key={friend.id} friend={friend} onRemove={handleRemove} onPress={onPress} />
            ))}
        </View>
    );
};
export default FriendList;

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
    },
})