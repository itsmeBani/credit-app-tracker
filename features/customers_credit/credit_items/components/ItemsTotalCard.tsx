import React from 'react';
import {Text, useColorScheme, View} from "react-native";
import {formatAmount} from "../../../../shared/utils/formatAmount";
import {useNavigation, useTheme} from "@react-navigation/native";
import ProgressBar from "../../../../shared/components/ProgressBar";

import {Wallet} from "lucide-react-native";
import Octicons from "@expo/vector-icons/Octicons";
import {withObservables} from "@nozbe/watermelondb/react";
import {creditsRepository} from "../../services/credits.service";
import ModelCredit from "../../../../local_database/model/model.credits";

import AnimatedNumber from "../../../../shared/components/AnimatedNumber";
import Button from "../../../../shared/components/Button";


function ItemsTotalCard({credit, itemCount}: { credit: ModelCredit, itemCount: number }) {
    const {colors} = useTheme();
    const {paidAmount, totalAmount,id,status} = credit
    const theme = useColorScheme()
    const isDark = theme === "dark"
    const balance = totalAmount - paidAmount


    const navigate = useNavigation()


    const navigatePaymentHistory = () => {
        navigate.navigate("Authenticated", {
            screen: "Payment",
            params: {
                screen: "PaymentHistory",
                params: {
                    creditId: credit.id,
                },
            },
        });
    };
    const navigateAddPayment = () => {
        navigate.navigate("Authenticated", {
            screen: "Payment",
            params: {
                screen: "AddPayment",
                params: {
                    creditId: credit.id,
                },
            },
        });
    };
    if (itemCount <= 0) return
    return (
        <View style={{
            shadowColor: "#000",
            shadowOffset: {width: 0, height: -3},
            shadowOpacity: 0.1,
            shadowRadius: 6,
            backgroundColor: colors.card,
            elevation: 8,
        }} className={"w-full p-4  flex flex-col gap-4"}>
            <View className="flex flex-row ">
                <View className="flex-1">

                    <Text className="font-jakarta dark:text-gray-200  text-slate-600 font-medium">
                        Total
                    </Text>

                    
                    <AnimatedNumber height={28}   fontSize={20}  value={totalAmount} color={colors.primary}/>

                    <Text className="font-jakarta dark:text-gray-200  font-medium text-slate-600 text-xs">
                        Total items: {itemCount ?? 0}
                    </Text>
                </View>
                <View className="flex-1">
                    <Text className="font-jakarta  dark:text-gray-200 text-slate-600 font-medium">
                        Balance
                    </Text>
                    <AnimatedNumber height={28}  fontSize={20} value={balance} color={colors.primary}/>

                    <Text className="font-jakarta dark:text-gray-200  font-medium  text-slate-600 text-xs">
                        Remaining to pay
                    </Text>

                </View>

            </View>
            <View>


                <Text className="font-jakarta leading-6 text-xs dark:text-gray-200 text-slate-600 font-medium">
                    Payment Process
                </Text>

                <ProgressBar amount={paidAmount} total={totalAmount}/>
                <View className="flex justify-between flex-row">
                    <Text
                        className="font-jakarta dark:text-white  text-blue-500 font-bold leading-4 text-slate-700 text-xs">
                        {formatAmount(paidAmount)} paid

                    </Text>
                    <Text
                        className="font-jakarta dark:text-white  text-blue-500 font-bold leading-4 text-slate-700 text-xs">
                        {formatAmount(totalAmount)} total

                    </Text>
                </View>
            </View>

            <View className="flex items-center justify-center flex-row gap-3 ">
                <View className="flex-1">
                    <Button onPress={navigatePaymentHistory} icon={<Octicons name="history" size={18} color={isDark ? "#ffffff" : colors.primary}/>}
                                label={"View Payment"} variant={"outline"}
                                containerClassName={"py-4    rounded-lg"}/>
                </View>
                {status !== "PAID" &&
                    <View className="flex-1">

                        <Button onPress={navigateAddPayment} icon={<Wallet color={"white"} size={18} strokeWidth={1.5}/>} label={"Add Payment"}
                                containerClassName={"py-4   rounded-lg"}/>

                    </View>
                }
            </View>
        </View>
    );
}

const enhance = withObservables(['creditId'], ({creditId}) => ({
    credit: creditsRepository.getObserveCreditById(creditId),
    itemCount: creditsRepository.getCreditItemCounts(creditId)
}))
export default enhance(ItemsTotalCard)

