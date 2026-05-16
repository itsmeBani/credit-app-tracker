import React from 'react';
import {Text, View} from "react-native";

type Props = {
    title?: string;
    align?: "left" | "center" | "right";
    description?:string
};

function Title({ title = "", align = "center" ,description=""}: Props) {


    return (
        <View className={` py-1  `} >
            <Text
                style={{ fontFamily: "PlusJakartaSans" }}
                className={`text-xl text-center font-bold dark:text-white text-slate-700 `}
            >
                {title ?? ""}
            </Text>
            {
                description &&   <Text
                    style={{ fontFamily: "PlusJakartaSans" }}
                    className={`text-xs font-semibold text-center dark:text-white text-slate-500 `}
                >
                    {description ?? "" }
                </Text>
            }
        </View>
    );
}

export default Title;