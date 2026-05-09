import {SyncStatus} from "../../features/sync/store/sync";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";

export const getStatusIcon = (status: SyncStatus) => {
    const size=17
    switch (status) {

        case 'syncing':
            return {
                icon:  <Feather name="loader" size={size} color={"#9CA3AF"} />,
                color: "#9CA3AF",
                title: "Syncing...",
                subtitle: "Syncing your data",
            };
        case 'success':
            return {
                icon:  <FontAwesome5 name="check-circle" size={size} color={"#22C55E"} />,
                color: "#22C55E",
                title: "Sync Completed",
                subtitle: "Finished",
            };
        case 'error':
            return {
                icon: <MaterialCommunityIcons name="alert-circle-outline" size={size} color={"#DC2626"} />,
                color: "#DC2626",
                title: "Sync Failed",
                subtitle: "Sync failed. Check connection"
            };
        default:
            return {
                icon: <MaterialCommunityIcons name="signal-off" size={size} color={"#9CA3AF"}/>,
                color: "#9CA3AF",
                title: "Idle",
                subtitle: "No internet connection",
            }

    }
}
