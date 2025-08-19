import { FriendRequestDTO } from "@/dto/friendDTO";
import FriendRequestList from "./FriendRequestList";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import GlobalStyles from "@/styles/global";

type FriendRequestsProps = {
  pendingRequests: FriendRequestDTO[];
  onAccept: (requestId: string) => Promise<boolean>;
  onDecline: (requestId: string) => Promise<boolean>;
};

const FriendRequests: React.FC<FriendRequestsProps> = ({
  pendingRequests,
  onAccept,
  onDecline
}) => {
    const [requests, setRequests] = useState<FriendRequestDTO[]>(pendingRequests);

    const handleAccept = async (requestId: string) => {
        const success = await onAccept(requestId);
        if (success) {
            setRequests(prev => prev.filter(req => req.id !== requestId));
        }
        return success;
    };

    const handleDecline = async (requestId: string) => {
        const success = await onDecline(requestId);
        if (success) {
            setRequests(prev => prev.filter(req => req.id !== requestId));
        }
        return success;
    };

    return (
        <View style={styles.container}>
            <FriendRequestList
                friendRequests={requests}
                onAccept={handleAccept}
                onDecline={handleDecline}
                />
        </View>
    );
};
export default FriendRequests;

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
    }
});