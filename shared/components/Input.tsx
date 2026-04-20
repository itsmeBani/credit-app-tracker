import React, { useState } from "react";
import {
    View,
    Text,
    TextInput as RNTextInput,
    TouchableOpacity,
    TextInputProps,
} from "react-native";

type BaseProps<T> = {
    label?: string;
    value: T;
    onChangeText: (value: T) => void;
    onClear?: () => void;
    placeholder?: string;
    isNumeric?: boolean;
} & Omit<TextInputProps, "value" | "onChangeText">;

export default function Input<T extends string | number>({
                                                             label = "label",
                                                             value,
                                                             onChangeText,
                                                             onClear,
                                                             placeholder = "Enter text...",
                                                             isNumeric = false,
                                                             ...props
                                                         }: BaseProps<T>) {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (text: string) => {
        if (isNumeric) {
            const numericValue = text.replace(/[^0-9.]/g, "");
            onChangeText(Number(numericValue) as T);
        } else {
            onChangeText(text as T);
        }
    };

    return (
        <View className=" ">
            <Text style={{fontFamily:"PlusJakartaSans"}} className="pb-2 text-gray-600 text-sm  dark:text-white">
                {label}
            </Text>

            <View
                className={`flex-row items-center rounded-lg     px-4 py-0.5 ${
                    isFocused
                        ? "border border-blue-300"
                        : "border border-gray-300 dark:border-gray-100/50"
                }`}
            >
                <RNTextInput
                    value={String(value)}
                    onChangeText={handleChange}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    style={{fontFamily:"PlusJakartaSans"}}
                    keyboardType={isNumeric ? "numeric" : "default"}
                    className="flex-1 text-gray-600 font-medium dark:text-white"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {String(value).length > 0 && onClear && (
                    <TouchableOpacity onPress={onClear}>
                        <Text className="text-gray-400">✕</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}