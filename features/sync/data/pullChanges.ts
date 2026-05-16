import axios from "axios";

import {MigrationSyncChanges} from "@nozbe/watermelondb/Schema/migrations/getSyncChanges";
import {SyncPullResult} from "@nozbe/watermelondb/sync";
import {API_BASE_URL} from "../../../shared/utils/constant";

export const pullChanges =
    async ({lastPulledAt} : {lastPulledAt?:number|undefined,migration: MigrationSyncChanges,schemaVersion:number}) : Promise<SyncPullResult> => {

        try {
            console.log('⬇️ pullChanges started')

            const response = await axios.get(
                `${API_BASE_URL}/sync?last_pulled_at=${lastPulledAt}`
            )

            const {changes, timestamp} = response.data

            return {changes, timestamp}

        } catch (err) {
            throw err
        }
}