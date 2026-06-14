import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";

type Props = {
    amount: number;
    total: number;
};

const getColor = (percent: number) => {
    if (percent < 20) return "bg-red-400";
    if (percent < 50) return "bg-orange-400";
    if (percent < 70) return "bg-amber-400";
    return "bg-green-500 dark:bg-green-600";
};

export default function ProgressBar({ amount, total }: Props) {
    const percent = total > 0 ? (amount / total) * 100 : 0;
    const clamped = Math.max(0, Math.min(percent, 100));

    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: clamped,
            duration: 500,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false, // width animation requires false
        }).start();
    }, [clamped]);

    const widthInterpolate = animatedWidth.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
    });

    return (
        <View className="w-full py-1">
            <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <Animated.View
                    className={`h-full ${getColor(clamped)}`}
                    style={{
                        width: widthInterpolate,
                    }}
                />
            </View>
        </View>
    );
}