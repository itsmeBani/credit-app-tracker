import React from 'react';
import { Pressable, Text, View, PressableProps } from "react-native";
import { useTheme } from "@react-navigation/native";

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

function IconButton({
                        label = "Title",
                        onPress,
                        icon,
                        disabled,
                        variant = "primary",
                        containerClassName = "",
                        textClassName = "",
                        iconClassName = "",
                        ...rest
                    }: IconButtonProps) {

    const { colors } = useTheme();

    const variants = {
        primary: {
            container: {
                backgroundColor: colors.primary,
            },
            text: {
                color: "#fff",
            },
        },

        outline: {
            container: {
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: colors.primary,
            },
            text: {
                color: colors.primary,
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
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: variant === "primary" ? 0.35 : 0,
                shadowRadius: 5,

                // Android shadow
                elevation: variant === "primary" ? 6 : 0,

                opacity: disabled ? 0.6 : 1,
            }}
            className={`py-2 px-4 rounded-full flex-row items-center justify-center gap-2 ${containerClassName}`}
            {...rest}
        >
            {icon && (
                <View className={iconClassName}>
                    {icon}
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

export default IconButton;