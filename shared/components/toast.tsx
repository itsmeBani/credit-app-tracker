import {toast} from "sonner-native";
import {Pressable, Text, View} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const base =
    "px-6 py-4 rounded-xl shadow-md flex-row items-center w-[90%]  gap-3";


const textTitle = "font-jakarta font-bold dark:text-white  text-xs flex-1";
const textDescription = "font-jakarta text-xs dark:text-white flex-1  ";
const buttonBase = " text-xs text-xs dark:text-white";

export const appToast = {
    success: (msg: string ,title = "Changes Saved" ) =>
        toast.custom(
            <View style={{ width: "100%", alignItems: "center" }}>
                <View className={`${base} bg-white  dark:bg-[#212121]   py-5 flex flex-row justify-between   self-center`} style={{elevation :2}}>
               <View className="flex flex-row gap-4 items-center justify-center">
                   <View

                       className="w-10  dark:bg-unset  rounded-lg flex items-center justify-center h-10 border border-gray-300 dark:border-gray-100/50"
                   >
                       <FontAwesome5 name="check-circle" size={20} color={"#22C55E"}/>
                   </View>


                   <View>
                       <Text  className={`${textTitle}  `}>{title}</Text>
                       <Text   className={`${textDescription}  `}>{msg}</Text>
                   </View>

               </View>
                    <Pressable  onPress={() => toast.dismiss()}>
                        <Text className={buttonBase}>Dismiss</Text>
                    </Pressable>
                </View>
            </View>
        ),


    error:(msg: string ,title = "Something went wrong" ) =>
        toast.custom(
            <View style={{ width: "100%", alignItems: "center" }}>
                <View className={`${base} bg-white  dark:bg-[#212121]   py-5 flex flex-row justify-between   self-center`} style={{elevation :2}}>
                    <View className="flex flex-row gap-4 items-center justify-center">
                        <View

                            className="w-10  dark:bg-unset  rounded-lg flex items-center justify-center h-10 border border-gray-300 dark:border-gray-100/50"
                        >
                            <MaterialCommunityIcons name="alert-circle-outline" size={20} color={"#DC2626"} />
                        </View>


                        <View>
                            <Text className={`${textTitle}  `}>{title}</Text>
                            <Text className={`${textDescription}  `}>{msg}</Text>
                        </View>

                    </View>
                    <Pressable  onPress={() => toast.dismiss()}>
                        <Text className={buttonBase}>Dismiss</Text>
                    </Pressable>
                </View>
            </View>
        ),

    warning:(msg: string ,title = "Something went wrong" ) =>
        toast.custom(
            <View style={{ width: "100%", alignItems: "center" }}>
                <View className={`${base} bg-white  dark:bg-[#212121]   py-5 flex flex-row justify-between   self-center`} style={{elevation :2}}>
                    <View className="flex flex-row gap-4 items-center justify-center">
                        <View

                            className="w-10  dark:bg-unset  rounded-lg flex items-center justify-center h-10 border border-gray-300 dark:border-gray-100/50"
                        >
                            <AntDesign name="warning" size={20} color={"#3B82F6"} />
                        </View>


                        <View>
                            <Text className={`${textTitle}  `}>{title}</Text>
                            <Text className={`${textDescription}  `}>{msg}</Text>
                        </View>

                    </View>
                    <Pressable  onPress={() => toast.dismiss()}>
                        <Text className={buttonBase}>Dismiss</Text>
                    </Pressable>
                </View>
            </View>
        ),
};