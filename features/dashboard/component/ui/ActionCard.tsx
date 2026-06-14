import React from "react";
import { Text, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import {ActionCardProps} from "../../types";

function ActionCard({
                        title="",
                        icon = "help-circle-outline",
                        onPress,
                        backgroundColor = "#FBCFE8",
                        iconColor = "#000",
                        size = 24,
                        width = 80,
                    } :ActionCardProps) {
    const { colors } = useTheme();

    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        scale.value = withTiming(0.96, {
            duration: 120,
        });
    };

    const handlePressOut = () => {
        scale.value = withTiming(1, {
            duration: 120,
        });
    };

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View
                style={[
                    animatedStyle,
                    {
                        width,
                        borderRadius: 10,
                        backgroundColor,
                            borderWidth: 0.7,
                        borderColor: colors.border,
                    },
                ]}
                className="p-4 items-center gap-2"
            >
                <MaterialCommunityIcons
                    name={icon}
                    size={size}
                    color={iconColor}
                />

                <Text
                    style={{ fontSize: 9 }}
                    className="text-center font-jakarta font-semibold"
                >
                    {title}
                </Text>
            </Animated.View>
        </Pressable>
    );
}

export default ActionCard;