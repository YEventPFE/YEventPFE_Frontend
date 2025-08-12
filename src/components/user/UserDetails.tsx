import { View, Text,StyleSheet, Pressable, ScrollView } from "react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import { useTranslation } from "react-i18next";
import { UserProfileDTO } from "@/dto/userDTO";
import { getAgeByBirthdate } from "@/utils/dateHelper";

type UserDetailsProps = {
    user: UserProfileDTO,
    onAddFriendPress?: (userId: string) => Promise<boolean>,
};

export default function UserDetails({ user, onAddFriendPress }: UserDetailsProps) {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userAge}>{t('age') + ": " + getAgeByBirthdate(user.birthDate)}</Text>
            {/**todo add list of public comments */}
            {onAddFriendPress && (
                <Pressable onPress={() => onAddFriendPress(user.id)}>
                    <Text style={styles.addFriendButton}>{t('add_friend')}</Text>
                </Pressable>
            )}
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