import React, { useState } from "react";
import {View, TextInput, TouchableOpacity, TextInputProps, useColorScheme} from "react-native";
import { Feather } from "@expo/vector-icons";

type SearchProps = {
    value: string;
    onChangeText: (text: string) => void;
    onClear?: () => void;
    placeholder?: string;
} & TextInputProps;

export default function Search({
                                   value,
                                   onChangeText,
                                   onClear,
                                   placeholder = "Search...",
                                   ...props
                               }: SearchProps) {
    const [isFocused, setIsFocused] = useState(false);
    const scheme = useColorScheme();
    return (
        <View className="py-2 pt-4">
            <View
                className={`flex-row items-center rounded-full px-4 
      ${isFocused ? " border border-blue-300" : " border border-gray-200 dark:border-gray-100/50"}
      shadow-xs`}
            >

                <Feather
                    name="search"
                    size={20}
                    color={scheme === "dark" ? "#FFFFFF" : "#9CA3AF"}
                />


                <TextInput style={{fontFamily:"PlusJakartaSans"}}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                           placeholderClassName={"dark:text-white"}
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 font-medium ml-3 dark:text-white  "
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />


                {value?.length > 0 && (
                    <TouchableOpacity
                        onPress={onClear ?? (() => onChangeText(""))}
                        className="ml-2 p-1 rounded-full bg-gray-200"
                    >
                        <Feather name="x" size={14} className="text-gray-600 " />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}