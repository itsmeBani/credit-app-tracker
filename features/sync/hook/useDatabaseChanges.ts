import {useEffect, useRef} from "react";
import {Database} from "@nozbe/watermelondb";
import {debounce} from "../../../shared/utils/debounce";
import {hasUnsyncedChanges} from "@nozbe/watermelondb/sync";
import {useNetInfo} from "@react-native-community/netinfo";

type UseSyncListenerProps = {
    database: Database;
    tables: string[];
    delay?: number;
    onSyncTrigger?: () => void;
};

export function useSyncOnDatabaseChange({
                                            database,
                                            tables,
                                            delay = 1000,
                                            onSyncTrigger,
                                        }: UseSyncListenerProps) {


    const {isInternetReachable, isConnected} = useNetInfo()

    const debouncedSync = useRef(
        debounce(() => {
            onSyncTrigger?.()
        }, delay)
    ).current;

    useEffect(() => {
        if (!database) return;

        const dbSubscription = database
            .withChangesForTables(tables)
            .subscribe(async () => {
                console.log("new update")
                const hasChanges = await hasUnsyncedChanges({database})

                if (isInternetReachable && isConnected && hasChanges) {
                    debouncedSync()
                }else {
                    console.log("skipped sync")
                }

            });

        return () => dbSubscription.unsubscribe();
    }, [database,debouncedSync,isInternetReachable, isConnected]);


}