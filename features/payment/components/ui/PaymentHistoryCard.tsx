import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModelPayment from "../../../../local_database/model/model.payments";
import { formatDate } from "../../../../shared/utils/formatDate";
import { formatAmount } from "../../../../shared/utils/formatAmount";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
type Props = {
    payment: ModelPayment;
};

function PaymentHistoryCard({ payment }: Props) {
    return (
        <View className="mb-3 rounded-2xl border border-slate-200 bg-white p-4">
            <View className="flex-row items-start justify-between">
                <View className="flex-row items-center gap-3 flex-1">
                    <View className="h-11 w-11 items-center justify-center rounded-full bg-blue-100">

                        <MaterialCommunityIcons name="wallet-bifold-outline" size={24}  color="#2563eb"/>
                    </View>

                    <View className="flex-1">
                        <Text className="font-jakarta text-base font-bold text-slate-900">
                            Payment Received
                        </Text>

                        <Text className="font-jakarta text-xs font-medium text-slate-500">
                            {formatDate(payment.createdAt)}
                        </Text>
                    </View>
                </View>

                <Text className="font-jakarta text-lg font-bold text-blue-600">
                     {formatAmount(payment.amount)}
                </Text>
            </View>

            {!!payment.note && (
                <View className="mt-3 rounded-xl bg-slate-50 p-3">
                    <Text className="font-jakarta text-xs font-semibold text-slate-500">
                        NOTE
                    </Text>

                    <Text className="mt-1 font-jakarta text-sm text-slate-700">
                        {payment.note}
                    </Text>
                </View>
            )}
        </View>
    );
}

export default PaymentHistoryCard;