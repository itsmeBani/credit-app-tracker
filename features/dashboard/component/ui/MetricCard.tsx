import React, { ComponentProps } from "react";
import { Text, useColorScheme, View, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import AnimatedNumber from "../../../../shared/components/AnimatedNumber";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type MetricCardProps = {
    title: string;
    value: number;
    subtitle?: string;
    format?: Intl.NumberFormatOptionsStyle;
    fontSize?: number;
    height?: number;
    icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
    style?: ViewStyle;
    iconColor?: string;
    iconBg?: string;
};

function MetricCard({
                        title,
                        value,
                        subtitle,
                        format = "decimal",
                        fontSize = 25,
                        height = 30,
                        icon,
                        iconBg,
                        iconColor,
                    }: MetricCardProps) {
    const { colors } = useTheme();
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    // 🔥 Adaptive defaults

    const resolvedIconBg = (isDark ? "rgba(243,244,246,0.09)": iconBg);

    const textColor = isDark ? "#E5E7EB" : "#374151";
    const subtitleColor = isDark ? "#9CA3AF" : "#6B7280";

    return (
        <View
            style={{
                backgroundColor:colors.card,
                elevation: 0.5,
            }}
            className="flex-1 rounded-lg items-start p-4 w-full h-full"
        >
            {/* Header */}
            <View
                style={{
                    backgroundColor: resolvedIconBg,
                    borderRadius: 999,
                }}
                className="py-1 mb-2 px-3 flex flex-row gap-2 items-center"
            >
                <MaterialCommunityIcons
                    name={icon}
                    size={18}
                    color={iconColor}
                />
                <Text
                    style={{ color: iconColor }}
                    className="font-jakarta text-sm font-semibold"
                >
                    {title}
                </Text>
            </View>

            {/* Value */}
            <AnimatedNumber
                color={textColor}
                fontSize={fontSize}
                height={height}
                format={format}
                value={value}
            />

            {/* Subtitle */}
            {subtitle && (
                <Text
                    style={{ color: subtitleColor }}
                    className="font-jakarta text-xs font-medium mt-1"
                >
                    {subtitle}
                </Text>
            )}
        </View>
    );
}

export default MetricCard;