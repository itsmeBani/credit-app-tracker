import React, {useEffect, useRef} from 'react';
import {FlashList} from "@shopify/flash-list";
import {Text, View} from "react-native";
import {withObservables} from "@nozbe/watermelondb/react";

import ModelCreditItem from "../../../../local_database/model/model.creditItems";
import ModelProducts from "../../../../local_database/model/model.products";

import {ProductCardAction} from "../../../products/components/ui/product/product";
import {creditsRepository, creditsService} from "../../services/credits.service";
import ItemCreditEmpty from "./ui/empty-state/ItemCreditEmpty";

type Props = {
    creditItems: ModelCreditItem[];
};

const Item = ({
                  creditItem,
                  product,
                  scheduleUpdate,
              }: {
    creditItem: ModelCreditItem;
    product: ModelProducts;
    scheduleUpdate: (id: string, qty: number) => void;
}) => {


    const {name, description, imageUrl} = product;
    const {priceAtPurchase, quantity: initialQty, id} = creditItem;

    const [quantity, setQuantity] = React.useState(initialQty);

    const computedSubtotal = priceAtPurchase * quantity;

    const increment = () => {
        setQuantity(prev => {
            const next = prev + 1;
            scheduleUpdate(id, next);
            return next;
        });
    };

    const decrement = () => {
        setQuantity(prev => {
            const next = Math.max(1, prev - 1);
            scheduleUpdate(id, next);
            return next;
        });
    };

    return (
        <ProductCardAction
            price={priceAtPurchase.toString()}
            name={name}
            quantity={quantity}
            subTotal={computedSubtotal}
            incrementQuantity={increment}
            decrementQuantity={decrement}
            description={description ?? ""}
            image={imageUrl}
        />
    );
};

function CustomerItemsCredit({creditItems}: Props) {


    const debounceMap = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

    const scheduleUpdate = (id: string, qty: number) => {
        const existing = debounceMap.current.get(id);

        if (existing) clearTimeout(existing);

        const timeout = setTimeout(() => {
            creditsService.updateItemQuantity(id, qty).finally(() => {
                debounceMap.current.delete(id);
            });
        }, 1000);

        debounceMap.current.set(id, timeout);
    };


    const enhances = withObservables(['creditItem'], ({creditItem}) => ({
        creditItem,
        product: creditItem.product,
    }));

    const CreditItem = enhances(({creditItem, product}) => (
        <Item
            creditItem={creditItem}
            product={product}
            scheduleUpdate={scheduleUpdate}
        />
    ));

    useEffect(() => {
        return () => {
            debounceMap.current.forEach(clearTimeout);
            debounceMap.current.clear();
        };
    }, []);


    return (
        <FlashList
            data={creditItems}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{height: 8}} />}
            showsVerticalScrollIndicator={false}

            contentContainerStyle={{
                paddingBottom: 20,
                gap: 10,
            }}

            ListEmptyComponent={() => <ItemCreditEmpty />}
            renderItem={({item}) => (
                <CreditItem creditItem={item} />
            )}
        />
    );
}

const enhance = withObservables(['creditId'], ({creditId}) => ({
    creditItems: creditsRepository.getCreditItemsByCreditId(creditId),
}));

export default enhance(CustomerItemsCredit);