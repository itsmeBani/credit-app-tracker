import {TouchableOpacity, Text, View} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import {useTheme} from "@react-navigation/native";
import React, { useEffect } from "react";


import {useSyncActions, useSyncState} from "../store/sync";
import {getStatusIcon} from "../../../shared/utils/getStatusIcon";

function SyncButton() {

    const {openBottomSheet } = useSyncActions();
    const { status,lastSyncedAt } = useSyncState();
    const statusIcon=getStatusIcon(status)

    const { colors } = useTheme();
    return (
      <View>
          <TouchableOpacity onPress={openBottomSheet} style={{backgroundColor:colors.card}} className={"w-10 relative rounded-lg h-10 border border-gray-300 dark:border-gray-100/50 shadow-md items-center flex justify-center "} >

              <View >
                  <AntDesign name="sync" size={17} color={"gray"} />
              </View>

              <View style={{backgroundColor:statusIcon.color}} className="w-2.5 h-2.5 absolute top-0 right-0 translate-x-1 -translate-y-1  rounded-full   " />
          </TouchableOpacity>
      </View>
    );
}

export default SyncButton;