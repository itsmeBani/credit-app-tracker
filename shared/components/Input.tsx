import React, { useState } from "react";
import {
    View,
    Text,
    TextInput as RNTextInput,
    TouchableOpacity,
    TextInputProps,
} from "react-native";

type BaseProps = {
    label?: string;
    value: string;
    onChangeText: (value: string) => void;
    onClear?: () => void;
    placeholder?: string;
    error?: string; // 👈 add this
} & Omit<TextInputProps, "value" | "onChangeText">;

export default function Input({
                                  label = "label",
                                  value,
                                  onChangeText,
                                  onClear,
                                  placeholder = "Enter text...",
                                  error,
                                  ...props
                              }: BaseProps) {
    const [isFocused, setIsFocused] = useState(false);

    const hasError = !!error;

    return (
        <View className="">
            <Text
                style={{ fontFamily: "PlusJakartaSans" }}
                className="pb-2 text-gray-600 text-sm dark:text-white"
            >
                {label}
            </Text>

            <View
                className="flex-row items-center rounded-lg px-3 py-0.5"
                style={{
                    borderWidth: 1,
                    borderColor: hasError
                        ? "#fd4949" // red-400
                        : isFocused
                            ? "#93C5FD" // blue-300
                            : "#D1D5DB", // gray-300
                }}
            >
                <RNTextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#B0B7C3"
                    style={{
                        fontFamily: "PlusJakartaSans",
                        fontWeight: "500",
                    }}
                    className="flex-1 text-gray-600 dark:text-white"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {value.length > 0 && onClear && (
                    <TouchableOpacity onPress={onClear}>
                        <Text className="text-gray-400">✕</Text>
                    </TouchableOpacity>
                )}
            </View>


            {hasError && (
                <Text style={{color:"#fd4949"}} className=" font-jakarta text-xs mt-1">
                    {error}
                </Text>
            )}
        </View>
    );
}