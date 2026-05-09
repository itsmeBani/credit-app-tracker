import React from 'react';
import {View, Text, Pressable, useColorScheme} from "react-native";

import {useTheme} from "@react-navigation/native";
import Entypo from '@expo/vector-icons/Entypo';
import {CustomerCardProps} from "../../types";


function CustomerCard({data,onClick}:CustomerCardProps) {

    const { colors } = useTheme();
    const theme=useColorScheme()
    const initials = `${data?.firstname?.charAt(0) ?? ""}${data?.lastname?.charAt(0) ?? ""}`;
    return (
        <Pressable onPress={onClick}   style={{backgroundColor:colors.card,elevation:1}}  className="w-full  rounded-lg shadow-md flex-row   gap-2 p-2 h-[70px] ">
        <View className="flex flex-1 flex-row p-2 gap-3">
            <View className="bg-blue-200/50 dark:bg-[#292929] items-center justify-center rounded-xl  aspect-square">
                <Text  className="text-lg font-jakarta dark:text-white  text-blue-500 font-bold">{initials}</Text>
            </View>
            <View className=" justify-center  flex-1 gap-1">
                <Text numberOfLines={1} className=" font-jakarta  text-sm capitalize dark:text-white font-semibold text-slate-600">{data?.firstname} {data?.lastname}</Text>

            </View>
        </View>
            <View className="justify-center flex-row  gap-7 items-center ">
              {/*<View>*/}
              {/*    <Text className=" font-jakarta text-slate-600  dark:text-gray-200 text-xs font-medium ">Balance</Text>*/}
              {/*    <Text className=" font-jakarta text-md text-slate-600  dark:text-white font-extrabold ">₱1,200</Text>*/}

              {/*</View>*/}
                <View>

                        <Entypo name="chevron-right" size={24} color={theme === "dark" ? "white" : "gray"} />

                </View>
            </View>
        </Pressable>
    );
}

export default CustomerCard;