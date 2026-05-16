import React from "react";
import {ActivityIndicator, Text, TouchableOpacity, ViewStyle} from "react-native";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
    title: string;
    onPress?: () => void;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    textClassName?: string;
    style?: ViewStyle;
    fullWidth?: boolean;
    size?: ButtonSize;
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg",
};

export default function Button({
                                   title,
                                   onPress,
                                   loading = false,
                                   disabled = false,
                                   className = "",
                                   textClassName = "",
                                   style,
                                   fullWidth = false,
                                   size = "md",
                               }: ButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            style={style}
            className={`
                flex flex-row items-center justify-center
                rounded-full
                bg-blue-500
                shadow-2xl
                active:opacity-80
                ${sizeStyles[size]}
                ${fullWidth && "w-full" }
                ${isDisabled ? "opacity-50" : ""}
                ${className}
            `}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text
                    style={{ fontFamily: "PlusJakartaSans" }}
                    className={`
                        text-white font-semibold
                        ${textClassName}
                    `}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}