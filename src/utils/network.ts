import * as Network from 'expo-network';


export const isInternetReachable = async (): Promise<boolean> => {
    try {
        const networkState = await Network.getNetworkStateAsync();
        return networkState.isInternetReachable || false;
    } catch (error) {
        console.error("Error checking internet reachability:", error);
    }
    return false;
};