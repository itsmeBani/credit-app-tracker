import React from 'react';
import {TouchableOpacity, useColorScheme, View, Text, Pressable} from "react-native";
import {useNavigation, useTheme} from "@react-navigation/native";
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
   const navigate=useNavigation()
    return (
        <View className="" >


        <View className=" flex flex-row justify-between items-center ">
            <Pressable className="w-10 h-10 items-center justify-center "
                onPress={()=>navigate.goBack()}
            >
                <Ionicons name="chevron-back-outline" color={colors.text} size={25} />
            </Pressable>


            <View  className=" -2 items-center">
                <Title title={title} description={description}/>
            </View>

            <View className="w-10 justify-center h-10 "

            >
                {rightComponent}
            </View>

        </View>

        </View>
    );
}

export default HeaderNavigation;