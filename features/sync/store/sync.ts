import { create } from 'zustand'
import {hasUnsyncedChanges, synchronize} from '@nozbe/watermelondb/sync'
import { localDatabase } from '../../../local_database'
import axios from 'axios'
import { API_BASE_URL } from '../../../AxiosConfig'
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import {useDatabase} from "@nozbe/watermelondb/hooks";

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error'
export const syncBottomSheetRef=React.createRef<BottomSheet>()
type SyncStore = {
    syncState: {
        status: SyncStatus
        error: string | null
        lastSyncedAt: number | null
    }
    hasChanges:boolean,
    actions: {
        sync: () => Promise<void>
        reset: () => void
        openBottomSheet:()=>void
        closeBottomSheet:()=>void
        setHasChanges:()=>void
    }
}
let isSyncRunning = false;



 const useSyncDatabaseStore = create<SyncStore>((set) => ({
    syncState: {
        status: 'idle',
        error: null,
        lastSyncedAt: null,
    },
     hasChanges:false,
    actions: {
        sync: async () => {
            if (isSyncRunning) {
                console.log('⛔ Sync already running - skipped')
                return
            }
            isSyncRunning = true

            try {
                // ✅ FIX: update inside syncState
                set((state) => ({
                    syncState: {
                        ...state.syncState,
                        status: 'syncing',
                        error: null,
                    },
                }))

                await synchronize({
                    database: localDatabase,

                    pullChanges: async ({ lastPulledAt }) => {

                        try {
                            console.log('⬇️ pullChanges started')

                            const response = await axios.get(
                                `${API_BASE_URL}/sync?last_pulled_at=${lastPulledAt}`
                            )

                            const { changes, timestamp } = response.data
                            return { changes, timestamp }

                        } catch (err) {
                            if (axios.isAxiosError(err)) {
                                set((state) => ({
                                    syncState: {
                                        ...state.syncState,
                                        status: 'error',
                                        error: err.message || 'Pull failed',
                                    },
                                }))
                            }
                            throw err
                        }
                        finally {
                            isSyncRunning = false
                        }
                    },

                    pushChanges: async ({ changes, lastPulledAt }) => {

                        console.log("pushing")
                        try {
                            await axios.post(`${API_BASE_URL}/sync`, {
                                changes,
                                lastPulledAt,
                            })
                        } catch (err) {
                            if (axios.isAxiosError(err)) {
                                set((state) => ({
                                    syncState: {
                                        ...state.syncState,
                                        status: 'error',
                                        error: err.message || 'Push failed',
                                    },
                                }))
                            }
                            throw err
                        }
                    },

                    migrationsEnabledAtVersion: 1,
                })

                // ✅ success
                set((state) => ({
                    syncState: {
                        ...state.syncState,
                        status: 'success',
                        lastSyncedAt: Date.now(),
                        error: null,
                    },
                }))

            } catch (err) {
                console.log('❌ Sync failed:', err)

                set((state) => ({
                    syncState: {
                        ...state.syncState,
                        status: 'error',
                        error: 'Sync failed. Please try again.',
                    },
                }))
            }
        },

        reset: () =>
            set((state) => ({
                syncState: {
                    ...state.syncState,
                    status: 'idle',
                    error: null,
                },
            })),
        openBottomSheet:()=>{
            syncBottomSheetRef.current?.expand()

        },
       closeBottomSheet:()=>{
           syncBottomSheetRef.current?.close()
       },
        setHasChanges:()=>set({ hasChanges: true })

        }


}))
export const useSyncState = () =>
    useSyncDatabaseStore((state) => state.syncState)

export const useHasUnsyncedChanges = () =>
    useSyncDatabaseStore((state) => state.hasChanges)

export const useSyncActions = () =>
    useSyncDatabaseStore((state) => state.actions)