import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModelPayment from "../../../../local_database/model/model.payments";
import { formatDate } from "../../../../shared/utils/formatDate";
import { formatAmount } from "../../../../shared/utils/formatAmount";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {PlusIcon} from "lucide-react-native";
import {useTheme} from "@react-navigation/native";
type Props = {
    payment: ModelPayment;
};

function PaymentHistoryCard({ payment }: Props) {
    const {colors}=useTheme()
    return (
        <View style={{backgroundColor:colors.card, borderColor:colors.border, borderStyle:"solid",borderWidth:1}} className="mb-3 rounded-2xl  p-4">
            <View className="flex-row items-start justify-between">
                <View className="flex-row items-center gap-3 flex-1">
                    <View className="h-11 w-11 items-center justify-center rounded-full dark:bg-green-50/10 bg-green-100">

                        <MaterialCommunityIcons name="wallet-bifold-outline" size={24}  color="#10b981"/>
                    </View>

                    <View className="flex-1">
                        <Text className="font-jakarta text-base dark:text-white font-bold text-slate-600">
                            Payment Received
                        </Text>

                        <Text className="font-jakarta text-xs dark:text-gray-300 font-medium text-slate-500">
                            {formatDate(payment.createdAt)}
                        </Text>
                    </View>
                </View>

                <Text className="font-jakarta text-md font-bold dark:text-white text-blue-600">
                 {formatAmount(payment.amount)}
                </Text>
            </View>

            {!!payment.note && (
                <View className="mt-3 rounded-xl dark:bg-gray-50/10 bg-slate-50 p-3">
                    <Text className="font-jakarta dark:text-gray-300 text-xs font-semibold text-slate-500">
                        NOTE
                    </Text>

                    <Text className="mt-1 font-jakarta dark:text-white text-sm text-slate-800 font-medium">
                        {payment.note}
                    </Text>
                </View>
            )}
        </View>
    );
}

export default PaymentHistoryCard;