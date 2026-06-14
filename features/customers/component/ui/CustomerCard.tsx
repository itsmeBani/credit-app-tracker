import React from 'react';
import {Pressable, Text, useColorScheme, View} from "react-native";

import {useTheme} from "@react-navigation/native";
import Entypo from '@expo/vector-icons/Entypo';
import {CustomerCardProps} from "../../types";


function CustomerCard({data,onClick}:CustomerCardProps) {

    const { colors } = useTheme();
    const theme=useColorScheme()
    const initials = `${data?.firstname?.charAt(0) ?? ""}${data?.lastname?.charAt(0) ?? ""}`;
    return (
        <Pressable onPress={onClick}   style={{backgroundColor:colors.card}}  className="w-full  rounded-lg shadow-md flex-row   gap-2 p-2 h-[70px] ">
        <View className="flex flex-1 flex-row p-2 gap-3">
            <View className="bg-blue-200/50 dark:bg-[#191919] items-center justify-center rounded-xl  aspect-square">
                <Text  className="text-lg font-jakarta dark:text-white  text-blue-500 font-bold">{initials}</Text>
            </View>
            <View className=" justify-center  flex-1 gap-1">
                <Text numberOfLines={1} className=" font-jakarta  text-sm capitalize dark:text-white font-semibold text-slate-600">{data?.firstname} {data?.lastname}</Text>

            </View>
        </View>
            <View className="justify-center flex-row  gap-7 items-center ">

                <View>

                        <Entypo name="chevron-right" size={24} color={theme === "dark" ? "white" : "gray"} />

                </View>
            </View>
        </Pressable>
    );
}

export default CustomerCard;