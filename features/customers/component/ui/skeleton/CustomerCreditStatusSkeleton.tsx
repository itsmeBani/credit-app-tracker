import React from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function CustomerCreditStatusSkeleton() {
    const { colors } = useTheme();

    return (
        <View
            style={{ backgroundColor: colors.card }}
            className="w-full flex flex-col gap-3 p-6 border dark:border-gray-50/5 border-gray-200 rounded-lg animate-pulse"
        >
            {/* Header */}
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center gap-2">
                    <View className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <View className="w-28 h-4 rounded bg-gray-300 dark:bg-gray-700" />
                </View>

                <View className="w-20 h-7 rounded-full bg-gray-300 dark:bg-gray-700" />
            </View>

            {/* Totals */}
            <View
                style={{ borderBottomWidth: 0.5 }}
                className="flex dark:border-gray-200/10 border-gray-200/50 pb-3 flex-row justify-between"
            >
                <View className="gap-2">
                    <View className="w-24 h-3 rounded bg-gray-300 dark:bg-gray-700" />
                    <View className="w-28 h-6 rounded bg-gray-300 dark:bg-gray-700" />
                </View>

                <View className="gap-2 items-end">
                    <View className="w-24 h-3 rounded bg-gray-300 dark:bg-gray-700" />
                    <View className="w-28 h-6 rounded bg-gray-300 dark:bg-gray-700" />
                </View>
            </View>

            {/* Footer */}
            <View className="flex flex-row items-end justify-between">
                <View className="gap-2">
                    <View className="w-20 h-3 rounded bg-gray-300 dark:bg-gray-700" />
                    <View className="w-32 h-7 rounded bg-gray-300 dark:bg-gray-700" />
                </View>

                <View className="w-24 h-10 rounded-lg bg-gray-300 dark:bg-gray-700" />
            </View>
        </View>
    );
}