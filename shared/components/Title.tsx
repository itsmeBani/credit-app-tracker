import React from 'react';
import { Text, View } from "react-native";

type Props = {
    title?: string;
    align?: "left" | "center" | "right";
    description?:string
};

function Title({ title = "", align = "center" ,description=""}: Props) {


    const textAlignClass =
        align === "center"
            ? "text-center"
            : align === "right"
                ? "text-right"
                : "text-left";

    return (
        <View className={` py-1 flex w-full `} >
            <Text
                style={{ fontFamily: "PlusJakartaSans" }}
                className={`text-xl font-bold dark:text-white text-slate-700 ${textAlignClass}`}
            >
                {title}
            </Text>
            {
                description &&   <Text
                    style={{ fontFamily: "PlusJakartaSans" }}
                    className={`text-xs font-semibold  dark:text-white text-slate-500 ${textAlignClass}`}
                >
                    {description}
                </Text>
            }
        </View>
    );
}

export default Title;