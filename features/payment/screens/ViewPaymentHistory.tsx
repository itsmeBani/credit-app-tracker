import React from 'react';

import {SafeAreaContainer} from "../../../shared/components/SafeLayoutContainer";
import HeaderNavigation from "../../../shared/components/HeaderNavigation";
import {usePaymentsByCreditId} from "../hook/useGetPayments";
import {ViewPaymentsParams} from "../types";
import {FlashList} from "@shopify/flash-list";
import PaymentHistoryCard from "../components/ui/PaymentHistoryCard";
import {View} from "react-native";

function ViewPaymentHistory({route}: ViewPaymentsParams) {
    const {creditId} = route.params
    const {payments, loading, refetch} = usePaymentsByCreditId(creditId)


    return (
        <SafeAreaContainer>

            <HeaderNavigation
                title={"Payment History"}
                description={"View all recorded payments"}
            />


        <View className={"py-3 flex-1"}>
            <FlashList
                data={payments}
                showsVerticalScrollIndicator={false}
                onRefresh={refetch}
                refreshing={loading}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <PaymentHistoryCard payment={item}/>
                )}
            />
        </View>
        </SafeAreaContainer>
    );
}

export default ViewPaymentHistory;