import React, {useEffect, useRef} from 'react';

import {FlashList, FlashListRef} from "@shopify/flash-list";
import {View} from "react-native";
import CustomerCreditStatus from "./ui/CustomerCreditStatus";
import {useNavigation} from "@react-navigation/native";
import ModelCredit from "../../../local_database/model/model.credits";
import {withObservables} from "@nozbe/watermelondb/react";
import CreditsRepository from "../data/credits.repository";
import CreditEmpty from "./ui/empty-state/CreditEmpty";

function CustomerCredits({credits}: { credits: ModelCredit[] }) {

    const navigation = useNavigation();
    const listRef = useRef<FlashListRef<ModelCredit>>(null);

    const navigateCustomerItemsCreditScreen = (creditId: string) => {
        navigation.navigate('Main', {
            screen: 'ManageCustomerItemsCredit',
            params: {
                creditId
            }
        });
    };


    useEffect(() => {
        if (credits?.length) {
            requestAnimationFrame(() => {
                listRef.current?.scrollToOffset({
                    offset: 0,
                    animated: true,
                });
            });
        }
    }, [credits.length]);

    return (
        <FlashList
            ref={listRef}
            scrollsToTop
            showsVerticalScrollIndicator={false}
            data={credits}
            contentInsetAdjustmentBehavior="automatic"
            ItemSeparatorComponent={() => <View style={{height: 8}} />}
            optimizeItemArrangement
            ListEmptyComponent={()=><CreditEmpty/>}

            getItemType={(item) => item.status}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <CustomerCreditStatus
                    onPress={() => navigateCustomerItemsCreditScreen(item.id)}
                    credit={item}
                />
            )}
        />
    );
}

const creditsRepository = new CreditsRepository();

const enhance = withObservables(
    ['creditId'],
    ({creditId}) => ({
        credits: creditsRepository.getObservedCredits(creditId)
    })
);

export default enhance(CustomerCredits);