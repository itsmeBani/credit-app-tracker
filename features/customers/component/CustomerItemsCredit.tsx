import React from 'react';
import {FlashList} from "@shopify/flash-list";
import {View} from "react-native";
import ModelCreditItem from "../../../local_database/model/model.creditItems";
import {withObservables} from "@nozbe/watermelondb/react";

import ModelProducts from "../../../local_database/model/model.products";
import {ProductCardAction} from "../../products/components/ui/product/product";
import {creditsRepository, creditsService} from "../services/credits.service";
import ItemCreditEmpty from "./ui/empty-state/ItemCreditEmpty";

function CustomerItemsCredit({creditItems}: { creditItems: ModelCreditItem[]}) {



    const Item = ({creditItem, product}: {
        creditItem: ModelCreditItem,
        product: ModelProducts
    }) => {

        const {name,description,imageUrl}= product
        const {priceAtPurchase,subtotal,quantity,id}=creditItem

        return (
            <ProductCardAction price={priceAtPurchase.toString()}
                               name={name}
                               quantity={quantity}
                               subTotal={subtotal}
                               incrementQuantity={()=>creditsService.incrementItemQuantity(id)}
                               decrementQuantity={()=>creditsService.decrementItemQuantity(id)}
                               description={description ?? ""}
                               image={imageUrl}
            />
        )
    }
    const enhances = withObservables(['creditItem'], ({creditItem}) => ({
        creditItem,
        product: creditItem.product,
    }))

    const CreditItem = enhances(Item)


    return (


          <FlashList
              data={creditItems}
              ItemSeparatorComponent={() => <View style={{height: 8}}/>}
              showsVerticalScrollIndicator={false}
              contentInsetAdjustmentBehavior="automatic"
              optimizeItemArrangement
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                  paddingBottom:20,
                  gap: 10,
              }} ListEmptyComponent={()=><ItemCreditEmpty/>}


              renderItem={({item}) => (

                  <CreditItem creditItem={item}/>
              )}
          />

    );
}



const enhance = withObservables(['creditId'], ({creditId}) => ({
    creditItems: creditsRepository.getCreditItemsByCreditId(creditId),

}))
export default enhance(CustomerItemsCredit)

