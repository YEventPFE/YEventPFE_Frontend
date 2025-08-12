import { View, Text,StyleSheet, Pressable, ScrollView } from "react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import { useTranslation } from "react-i18next";
import { UserProfileDTO } from "@/dto/userDTO";
import { getAgeByBirthdate } from "@/utils/dateHelper";
import CommentList from "../comments/CommentList";
import { CommentDTO } from "@/dto/commentDTO";

type UserDetailsProps = {
    user: UserProfileDTO,
    onAddFriendPress?: (userId: string) => Promise<boolean>,
    commentListProps: {
        comments: CommentDTO[];
        onCommentPress?: (comment: CommentDTO) => void;
        onUserPress?: (userId: string) => void;
    }
};

export default function UserDetails({ user, onAddFriendPress, commentListProps }: UserDetailsProps) {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userAge}>{t('age') + ": " + getAgeByBirthdate(user.birthDate)}</Text>
            {onAddFriendPress && (
                <Pressable onPress={() => onAddFriendPress(user.id)}>
                    <Text style={styles.addFriendButton}>{t('add_friend')}</Text>
                </Pressable>
            )}
            <CommentList
                comments={commentListProps.comments || user.publicComments}
                onUserPress={commentListProps.onUserPress}
                onCommentPress={commentListProps.onCommentPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: Colors.container.background,
    },
    userName: {
        ...Typography.title,
        marginBottom: 8,
    },
    userAge: {
        ...Typography.body,
        marginBottom: 8,
    },
    addFriendButton: {
        ...Typography.pressable,
        color: Colors.text.primary,
        textDecorationLine: 'underline',
        marginTop: 8,
    },
    tag: {
        ...Typography.tag,
        marginRight: 8,
        marginBottom: 8,
    },
});