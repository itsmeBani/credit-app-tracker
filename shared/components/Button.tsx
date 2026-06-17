import React from 'react';
import {Pressable, PressableProps, Text, useColorScheme, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';

type Variant = "primary" | "outline" | "ghost";

type IconButtonProps = PressableProps & {
    label?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    variant?: Variant;

    containerClassName?: string;
    textClassName?: string;
    iconClassName?: string;

};

function Button({
                        label = "Title",
                        onPress,
                        icon,
                        disabled=false,

                        variant = "primary",
                        containerClassName = "",
                        textClassName = "",
                        iconClassName = "",
                        ...rest
                    }: IconButtonProps) {

    const { colors } = useTheme();
    const theme =useColorScheme()
    const isDark=theme === "dark"
    const variants = {
        primary: {
            container: {
                backgroundColor: colors.primary,

                // iOS shadow
                shadowColor: "#1d4ed8",
                shadowOffset: {
                    width: 0,
                    height: isDark ? 2 : 6,
                },
                shadowOpacity: isDark ? 0.15 : 0.3,
                shadowRadius: isDark ? 4 : 8,

                // Android shadow
                elevation: isDark ? 3 : 4,
            },
            text: {
                color: "#fff",
            },
        },

        outline: {
            container: {
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor:isDark ? "rgba(255,255,255,0.47)" : colors.primary,
            },
            text: {
                color:isDark ? "#FFFFFF" : colors.primary,
            },
        },

        ghost: {
            container: {
                backgroundColor: "transparent",
            },
            text: {
                color: colors.primary,
            },
        },
    } satisfies Record<
        Variant,
        {
            container: object;
            text: object;
        }
    >;

    const current = variants[variant];

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={{
                ...current.container,

                shadowColor: colors.primary,

            }}
            className={`py-2 px-4 rounded-full flex-row items-center justify-center gap-2 ${containerClassName}`}
            {...rest}
        >
            {icon && (
                <View className={iconClassName}>
                    {disabled ? <Feather name="loader" size={20} color="white" className="animate-spin" />:   icon}
                </View>
            )}

            {label && (
                <Text
                    style={current.text}
                    className={`font-jakarta font-semibold text-sm ${textClassName}`}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
}

export default Button;