import { UserDTO, UserListDTO } from "@/dto/userDTO";
import { fetchUserAndRedirect } from "@/viewModels/authViewModel";
import { fetchAndSetUserList, useOnRemoveFriendPress } from "@/viewModels/friendViewModel";
import { onUserPress } from "@/viewModels/navigationViewModel";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";
import FriendList from "@/components/friends/FriendList";
import { Toast } from "react-native-toast-message/lib/src/Toast";


export default function MyFriendList(){
    const { t } = useTranslation();
    const [user, setUser] = useState<{ token: string , user: UserDTO } | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [friendList, setFriendList] = useState<UserListDTO | null>(null);


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
        const loadFriendList = async () => {
            try{
                await fetchAndSetUserList(user.token, setFriendList);
            } catch (err) {
                setError((err as Error).message);
                Toast.show({
                    type: 'error',
                    text1: t('error_loading_friendlist'),
                    text2: (err as Error).message || t('please_try_again_later'),
                });
            } finally {
                setLoading(false);
            }
        }
        loadFriendList();
        }
    }, [user]);

    if (loading) {
        return <Text>{t('loading')}</Text>;
    }

    if (!user) {
        return <Text>{t('user_not_found')}</Text>;
    }

    if (error || !friendList) {
        return <Text>{t('error_loading_friendlist')}, { error }</Text>;
    }

    const onRemoveFriend = useOnRemoveFriendPress(user.token);

    return (
        <FriendList
            friends={friendList}
            onPress={onUserPress}
            onRemove={onRemoveFriend}
        />
    );
}