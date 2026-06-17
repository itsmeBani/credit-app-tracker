import React, {useRef, useState} from "react";
import {ActivityIndicator, Pressable, Text, useColorScheme, View} from "react-native";
import BottomSheet, {BottomSheetModal} from "@gorhom/bottom-sheet";

import {SafeAreaContainer} from "../../../shared/components/SafeLayoutContainer";
import HeaderNavigation from "../../../shared/components/HeaderNavigation";
import NumpadModal from "../../../shared/components/Numpad";
import PaymentTypeSelector from "../components/PaymentTypeSelector";
import {PaymentType} from "../components/ui/PaymentTypeOption";
import AnimatedNumber from "../../../shared/components/AnimatedNumber";
import {useNavigation, useTheme} from "@react-navigation/native";
import Input from "../../../shared/components/Input";
import Badge from "../../../shared/components/Badge";
import {usePaymentService} from "../hook/usePaymentService";
import {CreatePaymentParams} from "../types";
import {useFetchCreditById} from "../../customers_credit/hook/useFetchCreditById";
import {formatAmount} from "../../../shared/utils/formatAmount";
import Button from "../../../shared/components/Button";
import {PaymentLoader} from "../components/PaymentLoader";
import {appToast} from "../../../shared/components/toast";
import KeyboardAwareContainer from "../../../shared/components/KeyboardAwareContainer";

function AddPaymentScreen({route}: CreatePaymentParams) {

    const theme = useColorScheme();
    const isDark = theme === "dark";
    const {colors} = useTheme();
    const navigate = useNavigation()

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const openSheet = () => bottomSheetRef.current?.present();
    const closeSheet = () => bottomSheetRef.current?.close();


    const {creditId} = route.params

    const {credit, loading: isFetchingCurrentCredit} = useFetchCreditById(creditId)

    const [partialAmount, setPartialAmount] = useState(0)
    const [paymentType, setPaymentType] = useState<PaymentType>("FULL")

    const {processOutstandingBalance, loading} = usePaymentService()

    const balance = (credit?.totalAmount ?? 0) - (credit?.paidAmount ?? 0)
    const [note, setNote] = useState("");

    const handlePayment = async () => {
         if (balance <=0) return  appToast.warning("no remaining balance","can process payment")

        if (paymentType === "PARTIAL" && partialAmount === 0) return appToast.warning("Enter partial amount","can process payment")


        const amountToPay = paymentType === "FULL" ? balance : partialAmount


        await processOutstandingBalance({
            creditId: creditId,
            amount: amountToPay,
            note: note
        })
        navigate.goBack()
    }

    return (
        <SafeAreaContainer >
            <HeaderNavigation
                title={"Payments"}
                description={"Record full or partial payments"}
            />
            <KeyboardAwareContainer>
                <View className="flex gap-3  pt-5">

                    <View className={"items-center  justify-center w-full"}>

                        <Badge variant={"warning"}>Balance</Badge>
                        <AnimatedNumber color={colors.primary} align={"center"} value={balance} height={70} fontSize={50}/>

                    </View>
                    <View>
                        <Text

                            className="pb-2 text-gray-600  font-jakarta text-sm dark:text-white"
                        >
                            Payment Type
                        </Text>
                        <PaymentTypeSelector value={paymentType} onChange={setPaymentType}/>

                    </View>
                    {paymentType === "PARTIAL" &&
                        <View>
                            <Text

                                className="pb-2 text-gray-600  font-jakarta text-sm dark:text-white"
                            >
                                Partial Amount
                            </Text>


                            <Pressable onPress={openSheet}
                                       className=" px-4 border border-gray-300  py-2 dark:bg-transparent bg-white rounded-md ">

                                <AnimatedNumber color={isDark ? "white" : colors.primary} marginTop={0} fontSize={20} height={32}
                                                value={partialAmount}/>

                            </Pressable>
                        </View>
                    }

                    <View>


                        <Input multiline={true} label={"Note"} placeholder="Add a note for this payment" value={note}
                               onChangeText={setNote} />
                    </View>
                    <Button containerClassName={"py-3"} onPress={handlePayment} label={"Confirm Pay"}
                            disabled={loading}/>
                </View>

            </KeyboardAwareContainer>


            <NumpadModal
                bottomSheetRef={bottomSheetRef}
               header={
                   <View className="flex-row gap-4 rounded-xl border border-green-200 bg-green-100/80 p-4 dark:border-green-900 dark:bg-green-950/40">
                       <View>
                           <Text className="font-jakarta text-xs text-slate-700 dark:text-slate-300">
                               Enter the payment amount. Maximum allowed is
                           </Text>

                           <Text className="font-jakarta text-2xl font-bold text-green-900 dark:text-green-500">
                               {formatAmount(balance)}
                           </Text>
                       </View>
                   </View>}   limit={balance}

                snapPoints={["100%"]}
                onSubmit={(value) => {
                    closeSheet()
                    setPartialAmount(value)

                }}
            />
        </SafeAreaContainer>
    );
}

export default AddPaymentScreen;