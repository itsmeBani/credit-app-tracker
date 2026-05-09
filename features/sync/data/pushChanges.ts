import axios from "axios";

import {SyncDatabaseChangeSet, SyncPushResult} from "@nozbe/watermelondb/sync";
import {API_BASE_URL} from "../../../shared/utils/constant";

export const pushChanges=
    async ({changes, lastPulledAt} : {changes: SyncDatabaseChangeSet, lastPulledAt:number}):Promise<SyncPushResult | undefined | void> => {

        try {
            await axios.post(`${API_BASE_URL}/sync`, {
                changes,
                lastPulledAt,
            })
        } catch (err) {
            throw err
        }
    }

