import { create } from 'zustand'
import {synchronize} from '@nozbe/watermelondb/sync'
import { localDatabase } from '../../../local_database'
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import {appToast} from "../../../shared/components/toast";
import {pullChanges} from "../data/pullChanges";
import {pushChanges} from "../data/pushChanges";
import {ImageUploadService} from "../../uploads/services/ImageUploadService";

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error'
export const syncBottomSheetRef=React.createRef<BottomSheet>()
type SyncStore = {
    syncState:SyncStatus
    actions: {
        sync: () => Promise<void>
        reset: () => void
        openBottomSheet:()=>void
        closeBottomSheet:()=>void

    }
}


 const useSyncDatabaseStore = create<SyncStore>((set,getState) => ({
    syncState:'idle',

    actions: {
        sync: async () => {
            const { syncState } = getState()

            const ImageService=new ImageUploadService()
            await ImageService.beginUpload()

            
            if (syncState === "syncing") {
             return
            }

            try {

                set({syncState:"syncing"})

                await synchronize({
                    database: localDatabase,
                    pullChanges,
                    pushChanges,
                    migrationsEnabledAtVersion: 1,
                })


                set({syncState:"success"})
                appToast.success("successfully synced.", "You're up to date",)
            } catch (err) {
                set({syncState:"error"})
                appToast.error("Sync failed", "Please try again",)
            }finally {
                set({syncState:"idle"})
            }
        },

        reset: () =>{},
        openBottomSheet: () => {
            syncBottomSheetRef.current?.expand()

        },
        closeBottomSheet: () => {
            syncBottomSheetRef.current?.close()
        }
    }


}))
export const useSyncState = () =>
    useSyncDatabaseStore((state) => state.syncState)



export const useSyncActions = () =>
    useSyncDatabaseStore((state) => state.actions)