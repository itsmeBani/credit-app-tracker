import React from "react";
import { Text, View, ViewProps } from "react-native";

type BadgeVariant =
    | "default"
    | "success"
    | "warning"
    | "info"
    | "destructive";

type Props = ViewProps & {
    children: React.ReactNode;
    variant?: BadgeVariant;
};

const variantStyles: Record<
    BadgeVariant,
    { container: string; text: string }
> = {
    default: {
        container:
            "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
        text: "text-gray-800 dark:text-gray-200",
    },

    success: {
        container:
            "bg-green-100 dark:bg-green-900/10 border-green-500 dark:border-green-800",
        text: "text-green-800 dark:text-green-300",
    },

    warning: {
        container:
            "bg-yellow-100/70 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800",
        text: "text-yellow-600 dark:text-yellow-300",
    },

    info: {
        container:
            "bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-800",
        text: "text-blue-800 dark:text-blue-300",
    },

    destructive: {
        container:
            "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800",
        text: "text-red-800 dark:text-red-300",
    },
};

export default function Badge({
                                  children,
                                  variant = "default",
                                  className,
                                  ...props
                              }: Props & { className?: string }) {
    const styles = variantStyles[variant];

    return (
        <View
            {...props}
            className={` px-3 py-1 rounded-full border  ${styles.container} ${className ?? ""}`}
        >
            <Text className={`text-[10px] w-full  pl-1 font-jakarta font-medium ${styles.text}`}>
                {children}
            </Text>
        </View>
    );
}