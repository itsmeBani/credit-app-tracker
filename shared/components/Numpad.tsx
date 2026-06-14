import React, { useState } from "react";
import {
    Text,
    View,
    Pressable,
    useColorScheme,
} from "react-native";

import BottomSheet, {
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

import AnimatedNumber from "./AnimatedNumber";
import IconButton from "./IconButton";

type Props = {
    bottomSheetRef: React.RefObject<BottomSheet | null>;
    onSubmit?: (value: number) => void;
    limit?: number;
    snapPoints?: string[];
    header?:React.ReactNode
};

const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

export default function NumpadModal({
                                        bottomSheetRef,
                                        onSubmit,
                                        limit,
    header,
                                        snapPoints = ["70%"],
                                    }: Props) {
    const [value, setValue] = useState(0);

    const theme = useColorScheme();
    const isDark = theme === "dark";
    const { colors } = useTheme();

    const updateValue = (newValue: number) => {
        if (limit !== undefined && newValue > limit) return;
        setValue(newValue);
    };

    const handlePress = (num: number) => {
        updateValue(value * 10 + num);
    };

    const handleZero = () => {
        updateValue(value * 10);
    };

    const handleDelete = () => {
        setValue(value < 10 ? 0 : Math.floor(value / 10));
    };

    const handleSubmit = () => {
        onSubmit?.(value);
    };

    const textColor = isDark ? "#FFFFFF" : colors.primary;

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
            backgroundStyle={{
                backgroundColor: colors.background,
                elevation: 5,
            }}
            handleIndicatorStyle={{
                backgroundColor: colors.border,
            }}
        >
            <BottomSheetScrollView
                className="flex-1 px-10"
                contentContainerStyle={{
                    paddingBottom: 40,
                    flex:1
                }}
            >
                <View className="gap-5 flex-1 justify-center ">
                    {header}

                    <View className="w-full items-center justify-center">
                    <View className={"w-full"}>
                        <Text className="font-jakarta font-medium text-slate-500">
                            Enter payment amount
                        </Text>
                       <AnimatedNumber
                            color={
                                limit !== undefined && value >= limit
                                    ? "#16A34A"
                                    : textColor
                            }
                            height={80}
                            value={value}
                        />

                    </View>
                        <View className="gap-2">
                            {numbers.map((row, i) => (
                                <View key={i} className="flex-row gap-2">
                                    {row.map((num) => (
                                        <Pressable
                                            key={num}
                                            onPress={() => handlePress(num)}
                                            className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-50/10 border border-gray-400/30 items-center justify-center active:scale-95"
                                        >
                                            <Text className="text-xl font-jakarta font-semibold text-blue-600 dark:text-white">
                                                {num}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            ))}

                            <View className="flex-row justify-center gap-3">
                                <View className="w-20 h-20" />

                                <Pressable
                                    onPress={handleZero}
                                    className="w-20 h-20 dark:bg-gray-50/10 rounded-2xl border border-gray-400/30 items-center justify-center active:scale-95"
                                >
                                    <Text className="text-xl font-jakarta font-semibold text-blue-600 dark:text-white">
                                        0
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={handleDelete}
                                    className="w-20 h-20 dark:bg-gray-50/10 dark:border dark:border-gray-400/30 items-center justify-center rounded-2xl bg-blue-100/50 active:scale-95"
                                >
                                    <MaterialCommunityIcons
                                        name="backspace-outline"
                                        size={22}
                                        color={isDark ? "white" : "#2563eb"}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </View>

                    <IconButton
                        label={"Enter"}
                        containerClassName={"py-4"}
                        onPress={handleSubmit}
                    />
                </View>
            </BottomSheetScrollView>
        </BottomSheet>
    );
}