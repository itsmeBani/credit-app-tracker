import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useColorScheme } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Image } from 'expo-image';
import ModelProductCategory from "../../../local_database/model/model.productCategory";

type Props = {
    item: ModelProductCategory;
    onPress?: () => void;
    isActive:boolean
};

function CategoryCard({ item, onPress, isActive}: Props) {
    const colorScheme = useColorScheme();

    const { colors } = useTheme();
    const activeBorder=isActive ? "#669cf4" :"transparent"

    return (
        <TouchableOpacity
            style={{opacity:item?._raw._status === "synced" ? 1 :0.50}}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <View
                style={{

                    borderColor:activeBorder,
                    borderWidth:2,
                    backgroundColor:
                        colorScheme === "dark"
                            ? colors.card
                            : (item.backgroundColor as string),
                }}
                className="w-20 h-20  border-[10px] rounded-2xl justify-center items-center"
            >
                <Image
                    source={item.imageUrl as string}
                    style={{width:55,height:55}}
                    contentFit="contain"
                    contentPosition={"center"}
                    cachePolicy={"memory-disk"}
                />
            </View>

            <Text
                style={{ fontFamily: "PlusJakartaSans" }}
                className="text-sm dark:text-white text-gray-700 font-medium ml-1 mt-1"
                numberOfLines={1}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );
}

export default CategoryCard;