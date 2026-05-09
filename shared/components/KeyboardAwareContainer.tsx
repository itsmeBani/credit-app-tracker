import React, { forwardRef } from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-controller";

type Props = {
    children: React.ReactNode;
    contentContainerClassName?: string;
    bottomOffset?: number;
};

const AppKeyboardAwareContainer = forwardRef<any, Props>(
    (
        {
            children,
            contentContainerClassName = "",
            bottomOffset = 80,
            ...props
        },
        ref
    ) => {
        return (
            <KeyboardAwareScrollView
                ref={ref}
                keyboardShouldPersistTaps="handled"
                contentContainerClassName={contentContainerClassName}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
                bottomOffset={bottomOffset}
                {...props}
            >
                {children}
            </KeyboardAwareScrollView>
        );
    }
);

export default AppKeyboardAwareContainer;