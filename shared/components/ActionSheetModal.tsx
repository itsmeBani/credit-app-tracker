import React, { forwardRef } from "react";
import { Text, View } from "react-native";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import IconButton from "./IconButton";

type Props = {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel?: () => void;
};

const ActionBottomSheet = forwardRef<BottomSheet, Props>(
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


        const renderBackdrop =
            (props: any) =>
                <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    opacity={0.4}
                    pressBehavior="close"
                />


        return (
            <BottomSheet
                ref={ref}
                index={-1}
                snapPoints={["25%"]}
                detached={true}

                enablePanDownToClose

                backdropComponent={(props)=> <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    opacity={0.4}
                    pressBehavior="close"
                />}
                handleIndicatorStyle={{ backgroundColor: "white" }}
                backgroundStyle={{ backgroundColor: colors.card }}
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
                                <IconButton
                                    variant="outline"
                                    label={cancelLabel}
                                    onPress={onCancel}
                                />
                            </View>

                            <View className="flex-1">
                                <IconButton
                                    label={confirmLabel}
                                    onPress={onConfirm}
                                />
                            </View>
                        </View>

                    </View>
                </BottomSheetView>
            </BottomSheet>
        );
    });

export default ActionBottomSheet;