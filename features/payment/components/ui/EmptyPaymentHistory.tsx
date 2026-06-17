import React from "react";
import { View, Text, Pressable } from "react-native";
import { ReceiptText } from "lucide-react-native";
import Button from "../../../../shared/components/Button";

type Props = {
    onPress: () => void;
};

export function EmptyPaymentHistory({ onPress }: Props) {
    return (
        <View className="flex-1 items-center mt-10 justify-center px-8">
            <View className="bg-blue-100 dark:bg-blue-900/30 p-5 rounded-full">
                <ReceiptText size={42} color="#2563eb" />
            </View>

            <Text className="font-jakarta font-bold text-slate-600 text-lg mt-5 text-center">
                No Payment History Yet
            </Text>

            <Text className="font-jakarta text-center text-xs text-gray-500 mt-2">
                You haven't made any payments yet. Start exploring your credits and make your first payment.
            </Text>

          <Button onPress={onPress} label={"Add Payment"} containerClassName={"mt-4 opacity-80"} variant={"outline"}>

          </Button>
        </View>
    );
}