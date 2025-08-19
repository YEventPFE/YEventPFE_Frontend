import Colors from "@/constants/colors";
import { UserDTO, UserProfileDTO } from "@/dto/userDTO";
import GlobalStyles from "@/styles/global";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View, StyleSheet } from "react-native";

type FriendItemProps = {
  friend: UserDTO;
  onRemove: (id: string) => Promise<boolean>;
  onPress: (id: string) => void;
};

const FriendItem: React.FC<FriendItemProps> = ({ friend, onRemove, onPress }) => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Text onPress={() => onPress(friend.id)}>{friend.name}</Text>
            <View style={styles.actionButtonsContainer}>
                <Pressable onPress={() => onRemove(friend.id)} style={styles.removeButton}>
                    <Text>{t('remove_friend')}</Text>
                </Pressable>
            </View>
        </View>
    );
};
export default FriendItem;

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
         marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.container.accent,
    },
    actionButtonsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    removeButton: {
        ...GlobalStyles.cancelButton,
    },
});