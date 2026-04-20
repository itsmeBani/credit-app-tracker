import React, {useEffect, useRef} from 'react';
import {Text, useColorScheme, View} from "react-native";

import Button from "../../shared/components/Button";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {syncBottomSheetRef, useHasUnsyncedChanges, useSyncActions, useSyncState} from "./store/sync";

import {formatDate, getStatusIcon} from "../../shared/utils/getStatusIcon";
import {useTheme} from "@react-navigation/native";
import {useCategoryActions} from "../products/store/store.category";
import {localDatabase} from "../../local_database";
import {useDatabase} from "@nozbe/watermelondb/hooks";
import {hasUnsyncedChanges} from "@nozbe/watermelondb/sync";


function SyncDetails() {
    const { colors } = useTheme();

    const { status,lastSyncedAt} = useSyncState();
    const hasChanges=useHasUnsyncedChanges()


    const { sync,setHasChanges } = useSyncActions();

    const {deleteAllCategories}=useCategoryActions()






    const statusIcon = getStatusIcon(status);






    return (
        <BottomSheet
            style={{

                shadowColor: "#000",
                borderRadius: 10,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0,
                shadowRadius: 0.1,
                backgroundColor: colors.card,
                elevation: 5,
            }}
            index={-1}
            handleIndicatorStyle={{backgroundColor:"white"}}
            backgroundStyle={{ backgroundColor:colors.card }}
            enablePanDownToClose={true}
            snapPoints={["20%"]}
            ref={syncBottomSheetRef}

        >
            <BottomSheetView>
                <View className="px-5 flex gap-5">

                    {/* ✅ Dynamic Status */}
                    <View className="w-full shadow-md flex flex-row items-center gap-4">
                        <View

                            className="w-10  dark:bg-unset  rounded-lg flex items-center justify-center h-10 border border-gray-300 dark:border-gray-100/50"
                        >
                            {statusIcon.icon}
                        </View>

                        <View className="justify-center flex gap-1">
                            <Text
                                className="font-jakarta dark:text-white text-gray-600 font-bold"
                                style={{ lineHeight: 20 }}
                            >
                                {statusIcon.title}
                            </Text>

                            <Text className="font-jakarta dark:text-gray-200 text-xs font-medium text-gray-600">
                                {statusIcon.subtitle}  {lastSyncedAt && formatDate(lastSyncedAt)}
                            </Text>
                        </View>
                    </View>


                    <View className="flex w-full   justify-center ">
                        <Button
                            onPress={sync}
                            loading={status === "syncing"}
                            title={status === "syncing" ? "Syncing..." : "Sync"}
                        />
                    </View>
                    {/*<Button onPress={deleteAllCategories} title={"delete"}/>*/}
                </View>

            </BottomSheetView>
        </BottomSheet>
    );
}

export default SyncDetails;