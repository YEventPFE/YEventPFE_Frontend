import { FriendRequestDTO } from "@/dto/friendDTO";
import { Text, Pressable, StyleSheet, View } from "react-native";
import { useTimeAgo } from "@/utils/dateHelper";



type FriendRequestProps = {
    friendRequest: FriendRequestDTO;
    onAccept: (requestId: string) => Promise<boolean>;
    onDecline: (requestId: string) => Promise<boolean>;
};

const FriendRequestItem: React.FC<FriendRequestProps> = ({ friendRequest, onAccept, onDecline }) => {
    const timeAgo = useTimeAgo(new Date(friendRequest.lastUpdate));
    return (
        <View>
            <Text>{friendRequest.sender.name}</Text>
            <Text>{timeAgo}</Text>
            <View>
                <Pressable onPress={() => onAccept(friendRequest.id)}>
                    <Text>Accept</Text>
                </Pressable>
                <Pressable onPress={() => onDecline(friendRequest.id)}>
                    <Text>Decline</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default FriendRequestItem;