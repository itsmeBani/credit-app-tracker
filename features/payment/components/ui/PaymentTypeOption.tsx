import React from "react";
import { Pressable, Text, View } from "react-native";

export type PaymentType = "FULL" | "PARTIAL";

type OptionColor = {
    bg: string;
    border: string;
    text: string;
    dot: string;
};

type PaymentTypeOptionProps = {
    option: PaymentType;
    active: boolean;
    colors: OptionColor;
    onPress: () => void;
};

export default function PaymentTypeOption({
                                              option,
                                              active,
                                              colors,
                                              onPress,
                                          }: PaymentTypeOptionProps) {

    const description=option === "PARTIAL" ? "Pay part of the total" : "Pay the full amount"
    return (
        <Pressable
            onPress={onPress}
            className={`${
                active
                    ? `${colors.bg} ${colors.border} dark:bg-transparent`
                    : "border-slate-200"
            } flex-row flex-1 bg-white dark:bg-[#191919] shadow-sm gap-2 px-3 py-3 rounded-lg border`}
        >
          <View className="flex-1">
              <Text
                  className={`${
                      active
                          ? colors.text
                          : "text-slate-400 dark:text-slate-300"
                  } font-jakarta  text-xs font-bold`}
              >
                  {option}
              </Text>
              <Text
                  className={`${
                      active 
                          ? colors.text
                          : "text-slate-400 dark:text-slate-300"
                  } font-jakarta  text-xs font-medium `}
              >
                  {description}
              </Text>
          </View>
            <View
                className={`${
                    active ? colors.border : "border-slate-300"
                } w-5 h-5 rounded-full border-2 items-center justify-center`}
            >
                {active && (
                    <View className={`${colors.dot} w-2.5 h-2.5 rounded-full`} />
                )}
            </View>



        </Pressable>
    );
}