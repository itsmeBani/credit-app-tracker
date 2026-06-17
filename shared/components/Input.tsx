import React, { useState } from "react";
import {
    Text,
    TextInput as RNTextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    useColorScheme,
} from "react-native";

type BaseProps = {
    label?: string;
    value: string;
    onChangeText: (value: string) => void;
    onClear?: () => void;
    placeholder?: string;
    error?: string;
    multiline?: boolean;
} & Omit<TextInputProps, "value" | "onChangeText" | "multiline">;

export default function Input({
                                  label = "label",
                                  value,
                                  onChangeText,
                                  onClear,
                                  placeholder = "Enter text...",
                                  error,
                                  multiline = false,
                                  ...props
                              }: BaseProps) {
    const [isFocused, setIsFocused] = useState(false);
    const colorScheme = useColorScheme();

    const isDark = colorScheme === "dark";
    const hasError = !!error;

    const borderColor = hasError
        ? "#fd4949"
        : isFocused
            ? "#93C5FD"
            : isDark
                ? "#27272a" // zinc-800 for dark mode
                : "#D1D5DB"; // gray-300 for light mode

    return (
        <View>
            <Text
                style={{ fontFamily: "PlusJakartaSans" }}
                className="pb-2 text-gray-600 text-sm dark:text-white"
            >
                {label}
            </Text>

            <View
                className={`flex-row items-start bg-white dark:bg-transparent rounded-lg ${
                    multiline ? "px-2" : "px-3 py-0.5"
                }`}
                style={{
                    borderWidth: 1,
                    borderColor,
                    minHeight: multiline ? 120 : 44,
                }}
            >
                <RNTextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#B0B7C3"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    multiline={multiline}
                    textAlignVertical={multiline ? "top" : "center"}
                    style={{
                        fontFamily: "PlusJakartaSans",
                        fontWeight: "500",
                        flex: 1,
                        minHeight: multiline ? 100 : undefined,
                    }}
                    className="text-gray-600 dark:text-white"
                    {...props}
                />

                {!multiline && value.length > 0 && onClear && (
                    <TouchableOpacity onPress={onClear}>
                        <Text className="text-gray-400">✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            {hasError && (
                <Text
                    style={{ color: "#fd4949" }}
                    className="font-jakarta text-xs mt-1"
                >
                    {error}
                </Text>
            )}
        </View>
    );
}