import { FriendRequestDTO } from "@/dto/friendDTO";
import { Text, Pressable, StyleSheet, View } from "react-native";
import { useTimeAgo } from "@/utils/dateHelper";
import GlobalStyles from "@/styles/global";
import Typography from "@/constants/typography";
import Colors from "@/constants/colors";
import { useTranslation } from "react-i18next";



type FriendRequestProps = {
    friendRequest: FriendRequestDTO;
    onAccept: (requestId: string) => Promise<boolean>;
    onDecline: (requestId: string) => Promise<boolean>;
};

const FriendRequestItem: React.FC<FriendRequestProps> = ({ friendRequest, onAccept, onDecline }) => {
    const timeAgo = useTimeAgo(new Date(friendRequest.lastUpdate));
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Text style={styles.senderName}>{friendRequest.sender.name}</Text>
            <Text style={styles.timeAgo}>{timeAgo}</Text>
            <View style={styles.actions}>
                <Pressable onPress={() => onAccept(friendRequest.id)} style={styles.acceptButton}>
                    <Text>{t('accept')}</Text>
                </Pressable>
                <Pressable onPress={() => onDecline(friendRequest.id)} style={styles.declineButton}>
                    <Text>{t('decline')}</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default FriendRequestItem;

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.container.accent,
    },
    senderName: {
        ...Typography.body,
        fontWeight: 'bold',
    },
    timeAgo: {
        ...Typography.subtitle,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    acceptButton: {
        ...GlobalStyles.button,
        backgroundColor: Colors.container.surface
    },
    declineButton: {
        ...GlobalStyles.cancelButton,
    },
});