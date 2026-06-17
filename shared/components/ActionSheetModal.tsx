import React, { forwardRef } from "react";
import { Text, View } from "react-native";
import BottomSheet, {
    BottomSheetBackdrop, BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";

import {useSafeAreaInsets} from "react-native-safe-area-context";
import Button from "./Button";

type Props = {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel?: () => void;
};

const ActionBottomSheet = forwardRef<BottomSheetModal, Props>(
    (
        {
            title,
            description,
            icon,
            confirmLabel = "Create",
            cancelLabel = "Cancel",
            onConfirm,
            onCancel,
        },
        ref
    ) => {
        const { colors } = useTheme();
             const {bottom}=useSafeAreaInsets()


        return (
            <BottomSheetModalProvider  >
                <BottomSheetModal
                    ref={ref}


                    backdropComponent={(props)=> <BottomSheetBackdrop
                        {...props}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                        opacity={0.4}
                        pressBehavior="close"
                    />}
                    handleIndicatorStyle={{ backgroundColor: "white" }}
                    backgroundStyle={{ backgroundColor: colors.card }}
                    bottomInset={bottom}
                    style={{
                        shadowColor: "#000",
                        borderRadius: 16,
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.2,
                        shadowRadius: 6,
                        elevation: 20,
                    }}
                >
                    <BottomSheetView>
                        <View className="px-5 py-4 flex gap-5">

                            <View className="flex flex-row gap-3 items-center">
                                {icon && (
                                    <View className="w-10 h-10 rounded-lg border border-blue-500 items-center justify-center">
                                        {icon}
                                    </View>
                                )}

                                <View className="flex-1">
                                    <Text className="font-jakarta font-bold text-base dark:text-white text-gray-800">
                                        {title}
                                    </Text>

                                    {description && (
                                        <Text className="text-xs mt-1 text-gray-500 dark:text-gray-200">
                                            {description}
                                        </Text>
                                    )}
                                </View>
                            </View>

                            <View className="flex flex-row gap-3">
                                <View className="flex-1">
                                    <Button
                                        variant="outline"
                                        label={cancelLabel}
                                        onPress={onCancel}
                                    />
                                </View>

                                <View className="flex-1">
                                    <Button
                                        label={confirmLabel}
                                        onPress={onConfirm}
                                    />
                                </View>
                            </View>

                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>

        );
    });

export default ActionBottomSheet;