import { FriendRequestStatus } from "@/dto/userDTO";
import { Pressable, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type FriendStatusProps = {
    userId : string,
    friendRequestStatus?: FriendRequestStatus;
    onAddFriendPress?: ((userId: string) => Promise<boolean>);
    onRemoveFriendPress?: ((userId: string) => Promise<boolean>);
    onCancelFriendRequestPress?: ((userId: string) => Promise<boolean>);
};

const FriendStatus = ({ userId, friendRequestStatus, onAddFriendPress, onRemoveFriendPress, onCancelFriendRequestPress }: FriendStatusProps) => {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [friendRequestStatusState, setFriendRequestStatusState] = useState<FriendRequestStatus | undefined | null>(friendRequestStatus);

    const handleAddFriendPress = async () => {
        if (!onAddFriendPress) return;

        setIsLoading(true);
        const result = await onAddFriendPress(userId);
        setIsLoading(false);

        if (result) {
            setFriendRequestStatusState(FriendRequestStatus.Pending);
        }
    };

    const handleRemoveFriendPress = async () => {
        if (!onRemoveFriendPress) return;

        setIsLoading(true);
        const result = await onRemoveFriendPress(userId);
        setIsLoading(false);

        if (result) {
            setFriendRequestStatusState(FriendRequestStatus.Declined);
        }
    };

    const handleCancelFriendRequestPress = async () => {
        if (!onCancelFriendRequestPress) return;

        setIsLoading(true);
        const result = await onCancelFriendRequestPress(userId);
        setIsLoading(false);

        if (result) {
            setFriendRequestStatusState(null);
        }
    };

    if(isLoading){
        return <Text>{t('loading')}</Text>;
    }

    if (friendRequestStatusState === FriendRequestStatus.Declined) {
        return <Text>{t('friend_request_declined')}</Text>;
    }
    
    if (friendRequestStatusState === FriendRequestStatus.Accepted && onRemoveFriendPress) {
        return (
            <Pressable onPress={handleRemoveFriendPress}>
                <Text>{t('remove_friend')}</Text>
            </Pressable>
        );
    }

    if (friendRequestStatusState === FriendRequestStatus.Pending && onCancelFriendRequestPress) {
        return (
            <Pressable onPress={handleCancelFriendRequestPress}>
                <Text>{t('cancel_friend_request')}</Text>
            </Pressable>
        );
    }

    if (onAddFriendPress) {
        return (
            <Pressable onPress={handleAddFriendPress} disabled={isLoading}>
                <Text>{isLoading ? t('loading') : t('add_friend')}</Text>
            </Pressable>
        );
    }

    return null;
};

export default FriendStatus;