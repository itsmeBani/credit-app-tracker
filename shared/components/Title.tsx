import React from 'react';
import { Text, View } from "react-native";

type Props = {
    title?: string;
    align?: "left" | "center" | "right";
};

function Title({ title = "", align = "center" }: Props) {


    const textAlignClass =
        align === "center"
            ? "text-center"
            : align === "right"
                ? "text-right"
                : "text-left";

    return (
        <View className={`px-5 py-1 flex w-full `} >
            <Text
                style={{ fontFamily: "PlusJakartaSans" }}
                className={`text-xl font-bold dark:text-white text-gray-600 ${textAlignClass}`}
            >
                {title}
            </Text>
        </View>
    );
}

export default Title;