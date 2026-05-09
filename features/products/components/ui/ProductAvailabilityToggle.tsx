import React from "react";
import {View, Text, Pressable} from "react-native";

type ProductAvailability = "AVAILABLE" | "UNAVAILABLE";

type ProductAvailabilityToggleProps = {
    value: ProductAvailability;
    onChange: (value: ProductAvailability) => void;
};

type RadioButtonActiveColor = {
    bg: string
    border: string
    text: string
    primary: string
}


function ProductAvailabilityToggle({
                                       value,
                                       onChange,
                                   }: ProductAvailabilityToggleProps) {


    const RadioButton = ({value, staticValue, activeColor}: {
        value: string,
        activeColor: RadioButtonActiveColor
        staticValue: ProductAvailability
    }) => {


        const activeBaseClass = value === staticValue ? `${activeColor.bg} ${activeColor.border} dark:bg-transparent` : "border-slate-300"
        const activeTextColor = value === staticValue ? `${activeColor.text}` : "text-slate-400 dark:text-slate-300"
        const activeBorderColor = value === staticValue ? `${activeColor.border}` : "border-slate-300"

        return <Pressable
            onPress={() => onChange(staticValue)}
            className={`${activeBaseClass} flex-row w-auto items-center  shadow-md gap-2 px-3 py-3 rounded-lg border`}
        >
            <View
                className={`${activeBorderColor} w-5 h-5 rounded-full border-2 items-center justify-center`}
            >
                {value === staticValue && (
                    <View className={`${activeColor.primary} w-2.5  h-2.5 rounded-full `}/>
                )}
            </View>

            <Text
                className={`${activeTextColor} font-jakarta text-xs font-semibold  `}
            >
                {staticValue}
            </Text>
        </Pressable>

    }

    return (
        <View>
            <Text style={{fontFamily: "PlusJakartaSans"}} className={"pb-2 text-gray-600 text-sm dark:text-white"}>
                Status
            </Text>

            <View className="flex-row gap-2">

                <RadioButton activeColor={{
                    bg: "bg-green-50",
                    primary: "bg-green-500",
                    border: "border-green-500",
                    text: "text-green-500"
                }}
                             value={value}
                             staticValue={"AVAILABLE"}
                />

                <RadioButton activeColor={{
                    bg: "bg-blue-50",
                    primary: "bg-blue-500",
                    border: "border-blue-500",
                    text: "text-blue-500"
                }}
                             value={value}
                             staticValue={"UNAVAILABLE"}
                />

            </View>
        </View>
    );
}

export default ProductAvailabilityToggle;