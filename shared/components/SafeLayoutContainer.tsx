import React, {ReactNode} from "react";
import {View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type SafeAreaContainerProps = {
    children: ReactNode;
    className?: string;
    disablePaddingBottom?:boolean
    /**
     * Horizontal padding added on top of safe area inset
     * default = 10
     */
    horizontalPadding?: number;
};

export function SafeAreaContainer({
                                      children,
                                      className = "",
                                      disablePaddingBottom=false,
                                      horizontalPadding = 10,
                                  }: SafeAreaContainerProps) {
    const insets = useSafeAreaInsets();

    return (
        <View
            className={className}
            style={{
                flex: 1,
                paddingTop: insets.top,
                paddingBottom: disablePaddingBottom ? 0 : insets.bottom,
                paddingLeft: insets.left + horizontalPadding,
                paddingRight: insets.right + horizontalPadding,
            }}
        >
            {children}
        </View>
    );
}