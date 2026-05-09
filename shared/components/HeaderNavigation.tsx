import React from 'react';
import { TouchableOpacity, useColorScheme, View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "./Title";

type HeaderNavigationProps = {
    title?: string;
    onPress?: () => void;
    description?:string,
    rightComponent?: React.ReactNode;
};

function HeaderNavigation({
                              title = "Title",
                                 description="",
                              onPress,
                              rightComponent,
                          }: HeaderNavigationProps) {
    const { colors } = useTheme();

    return (
        <View className="" >


        <View className=" relative ">
            <TouchableOpacity style={{zIndex:1111}}
                onPress={onPress}
                className="absolute left-0 top-1/2   -translate-y-1/2 shadow-2xl p-3   w-15 h-15 rounded-full"
            >
                <Ionicons name="chevron-back-outline" color={colors.text} size={25} />
            </TouchableOpacity>


            <View className="  items-center">
                <Title title={title} description={description}/>
            </View>


        </View>

        </View>
    );
}

export default HeaderNavigation;