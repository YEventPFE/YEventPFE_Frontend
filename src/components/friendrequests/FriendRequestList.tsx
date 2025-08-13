import { FriendRequestDTO } from "@/dto/friendDTO";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import FriendRequestItem from "@/components/friendrequests/FriendRequestItem";

type FriendRequestListProps = {
    friendRequests: FriendRequestDTO[];
    onAccept: (requestId: string) => Promise<boolean>;
    onDecline: (requestId: string) => Promise<boolean>;
};

const FriendRequestList: React.FC<FriendRequestListProps> = ({ friendRequests, onAccept, onDecline }) => {
    const { t } = useTranslation();
    if (!friendRequests || friendRequests.length === 0) {
        return <View><Text>{t('no_friend_requests')}</Text></View>;
    }

    return (
        <View>
            {friendRequests.map((request) => (
                <FriendRequestItem
                    key={request.id}
                    friendRequest={request}
                    onAccept={onAccept}
                    onDecline={onDecline}
                />
            ))}
        </View>
    );
}

export default FriendRequestList;