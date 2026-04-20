import NetInfo from "@react-native-community/netinfo";

export function startNetworkListener(onOnline: () => void) {
    return NetInfo.addEventListener((state) => {
        const online =
            state.isConnected && state.isInternetReachable !== false;

        if (online) {
            console.log("🌐 Online → triggering callback");
            onOnline();
        } else {
            console.log("📴 Offline");
        }
    });
}