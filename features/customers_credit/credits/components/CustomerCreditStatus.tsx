import {Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";

import {CalendarFold} from "lucide-react-native";
import {formatDate} from "../../../../shared/utils/formatDate";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {CreditStatusBadge} from "./ui/CreditStatusBadge";
import {formatAmount} from "../../../../shared/utils/formatAmount";
import {CustomerCreditStatusProps} from "../types";
import {withObservables} from "@nozbe/watermelondb/react";
import Button from "../../../../shared/components/Button";

function CustomerCreditStatus({
                                  onPress,
                                  credit
                              }: CustomerCreditStatusProps) {


    const {colors} = useTheme();

    const {totalAmount, paidAmount, createdAt,status} = credit

    return (
        <View style={{backgroundColor: colors.card}}
              className="w-full  flex flex-col gap-3 p-6 border dark:border-gray-50/5  border-gray-200    rounded-lg"
        >
            <View className="flex  flex-row justify-between">
                <View className="flex  flex-row  items-center  gap-2">
                    <CalendarFold size={17} color={"gray"}/>
                    <Text className="text-gray-500 dark:text-gray-200 font-jakarta text-sm font-medium">

                        {formatDate(createdAt)}
                    </Text>
                </View>




                <CreditStatusBadge status={status}/>
            </View>
            <View
                style={{borderBottomWidth: 0.5}}
                className="flex  dark:border-gray-200/10 border-gray-200/50 pb-2 flex-row justify-between"
            >
                <View>
                    <Text className=" font-jakarta dark:text-gray-200 text-slate-700 font-medium text-sm">
                        Total Credit
                    </Text>
                    <Text className=" font-jakarta dark:text-gray-200 text-slate-500 text-lg font-bold">
                        {formatAmount(totalAmount)}
                    </Text>
                </View>

                <View>
                    <Text className=" font-jakarta dark:text-gray-200  text-slate-700 font-medium text-sm">
                        Paid Amount
                    </Text>
                    <Text className=" font-jakarta dark:text-gray-200  text-slate-500 text-lg font-bold">
                        {formatAmount(paidAmount)}

                    </Text>
                </View>
            </View>

            <View className="flex flex-row items-end justify-between ">

                <View>
                    <Text className=" font-jakarta dark:text-gray-200 font-medium text-sm">
                        Balance
                    </Text>
                    <Text className=" font-jakarta dark:text-gray-200  text-orange-400 text-2xl font-bold">
                        {formatAmount(totalAmount - paidAmount)}</Text>
                </View>
                <View>

                    <Button onPress={onPress}
                                icon={<MaterialCommunityIcons name="package-variant-closed" size={17} color="white"/>}
                                label={"Items"}/>
                </View>
            </View>
        </View>
    );
}

const enhance = withObservables(
    ['credit'],
    ({credit}) => ({
        credit
    })
);

export default enhance(CustomerCreditStatus);
