import { UserDTO } from "@/dto/userDTO";
import { fetchUserAndRedirect } from "@/viewModels/authViewModel";
import { router } from "expo-router";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FriendRequestDTO } from "@/dto/friendDTO";
import { fetchAndSetPendingFriendRequests, useOnAcceptFriendRequest, useOnDeclineFriendRequest } from "@/viewModels/friendViewModel";
import FriendRequestsComponent from "@/components/friendrequests/FriendRequests";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Typography from "@/constants/typography";
import GlobalStyles from "@/styles/global";


export default function FriendRequests() {
    const { t } = useTranslation();
    const [user, setUser] = useState<{ token: string , user: UserDTO } | undefined>(undefined);
    const [friendRequests, setFriendRequests] = useState<FriendRequestDTO[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

  

    useEffect(() => {
    fetchUserAndRedirect(router, setUser)
        .catch(err => {
          setError(err.message);
          Toast.show({
            type: 'error',
            text1: t('error_fetching_user'),
            text2: (err as Error).message || t('please_try_again_later'),
          });
        });
    }, []);

    useEffect(() => {
    if (user) {
        fetchAndSetPendingFriendRequests(user.token, setFriendRequests)
        .catch(err => {
          setError(err.message);
          Toast.show({
            type: 'error',
            text1: t('error_loading_friend_requests'),
            text2: (err as Error).message || t('please_try_again_later'),
          });
        })
        .finally(() => setLoading(false));
    }
    }, [user]);

    if (loading) {
        return <Text>{t('loading')}</Text>;
    }

    if (!user) {
        return <Text>{t('user_not_found')}</Text>;
    }

    if (error) {
        return <Text>{t('error_loading_friend_requests', { error })}</Text>;
    }
    
    const onAccept = useOnAcceptFriendRequest(user.token);
    const onDecline = useOnDeclineFriendRequest(user.token);
    if (friendRequests) {
        return (
            <ScrollView style={styles.container}>
                <View>
                <FriendRequestsComponent
                    pendingRequests={friendRequests}
                    onAccept={onAccept}
                    onDecline={onDecline}
                    />
                </View>
            </ScrollView>
        );
    }

    return <Text>{t('no_friend_requests')}</Text>;
}

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
    }
});