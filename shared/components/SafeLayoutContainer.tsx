import React, { ReactNode } from "react";
import {SafeAreaView, useSafeAreaInsets,} from "react-native-safe-area-context";
import {View} from "react-native";

type SafeAreaContainerProps = {
    children: ReactNode;
    className?: string;
};

export function SafeAreaContainer({
                                      children,
                                      className = "",
                                  }: SafeAreaContainerProps) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1,

                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left +10,
                paddingRight: insets.left +10,
            }}
        >
            {children}
        </View>
    );
}