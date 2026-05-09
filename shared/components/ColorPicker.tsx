import React, {useEffect, useState} from "react";
import {ScrollView, Pressable, View, Text} from "react-native";
import {COLOR_PALETTE} from "../utils/constant";

type Props = {
    onColorChange?: (color: string) => void;

    label?:string
};



export default function ColorPicker({ onColorChange,label="" }: Props) {
    const [selected, setSelected] = useState(
       COLOR_PALETTE[0].hex
    );

    const handleSelect = (hex: string) => {
        setSelected(hex);
        onColorChange?.(hex);
    };

    useEffect(() => {
        onColorChange?.(COLOR_PALETTE[0].hex);
    }, []);

    return (
    <View>
        <Text
            style={{ fontFamily: "PlusJakartaSans" }}
            className="pb-2 text-gray-600 text-sm dark:text-white"
        >
            {label}
        </Text>
        <ScrollView
            horizontal
            overScrollMode={"never"}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{

                gap: 5,
            }}
        >

            {COLOR_PALETTE.map((color) => {
                const isActive = selected === color.hex;

                return (
                    <Pressable
                        key={color.name}

                        onPress={() => handleSelect(color.hex)}
                        style={{ backgroundColor: color.hex ,borderColor : isActive ? "#669cf4" : "transparent", borderWidth:2, borderStyle:"solid"}}
                        className={` rounded-xl items-center h-10 w-10 justify-center shadow-md `}
                    >

                    </Pressable>
                );
            })}
        </ScrollView>
    </View>
    );
}