import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type SafeAreaContainerProps = {
    children: ReactNode;
    className?: string;
};

export function SafeAreaContainer({
                                      children,
                                      className = "",
                                  }: SafeAreaContainerProps) {
    return (
        <SafeAreaView edges={["top", "left", "right",]}
            className={`flex-1 ${className} `}
        >
            {children}
        </SafeAreaView>
    );
}