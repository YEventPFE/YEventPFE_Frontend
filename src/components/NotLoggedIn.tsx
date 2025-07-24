import GlobalStyles from "@/styles/global";
import { useRouter } from "expo-router";
import { useTranslation } from "node_modules/react-i18next";
import { View, Text, StyleSheet, Pressable } from "react-native";

const NotLoggedIn = () => {
    const { t } = useTranslation();
    const router = useRouter();
    
    return (
        <View style={styles.container}>
        <Text>{t("not_connected")}</Text>
        <Pressable onPress={() => router.replace("/login")}>
            <Text style={styles.addFriendButton}>{t("go_to_login_page")}</Text>
        </Pressable>
        </View>
    );
}

export default NotLoggedIn;

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    addFriendButton: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
});