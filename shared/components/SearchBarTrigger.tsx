import React from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { Feather } from "@expo/vector-icons";

type SearchTriggerProps = {
    placeholder?: string;
    onPress: () => void;
};

export default function SearchTrigger({
                                          placeholder = "Search...",
                                          onPress,
                                      }: SearchTriggerProps) {
    const scheme = useColorScheme();

    return (
        <View className="py-2 pt-4">
            <Pressable
                onPress={onPress}
                className="flex-row items-center rounded-full px-4 bg-white dark:bg-[#272727] py-3 border border-gray-200 dark:border-gray-100/50 shadow-xs"
            >
                <Feather
                    name="search"
                    size={20}
                    color={scheme === "dark" ? "#FFFFFF" : "#9CA3AF"}
                />

                <Text
                    style={{ fontFamily: "PlusJakartaSans" }}
                    className="ml-3 flex-1 font-medium text-gray-400 dark:text-white"
                >
                    {placeholder}
                </Text>
            </Pressable>
        </View>
    );
}