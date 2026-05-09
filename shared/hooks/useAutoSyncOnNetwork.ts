import {useEffect, useRef} from "react";
import NetInfo from "@react-native-community/netinfo";

type UseAutoSyncOnNetworkProps = {
    sync: () => Promise<void>;
};

export function useAutoSyncOnNetwork({ sync }: UseAutoSyncOnNetworkProps) {
    const wasOnline = useRef(false);
    const syncing = useRef(false);

    useEffect(() => {
        return NetInfo.addEventListener(async (state) => {
            const online =
                state.isConnected === true &&
                state.isInternetReachable === true;

            if (online && !wasOnline.current && !syncing.current) {
                try {
                    syncing.current = true;
                    console.log("🌐 Back online → syncing...");
                    await sync();
                } catch (e) {
                    console.log("❌ Sync failed:", e);
                } finally {
                    syncing.current = false;
                }
            }

            if (!online) {
                console.log("📴 Offline");
            }

            wasOnline.current = online;
        });
    }, [sync]);
}