import React from 'react';
import { View} from "react-native";

import {ProductsProps} from "../types";
import {useNavigation} from "@react-navigation/native";
import {withObservables} from "@nozbe/watermelondb/react";
import {ProductRepository} from "../data/product.repository";
import {ProductCard} from "./ui/product/product";
import {FlashList} from "@shopify/flash-list";
import ModelProducts from "../../../local_database/model/model.products";


function Products({
                      products, layout = {
        layout: "GRID",
        col: 2
    }
                  }: ProductsProps) {

    const navigation = useNavigation()
    console.log("rerender 1")
    const navigateManageProduct = (id: string) => {
        navigation.navigate('Authenticated', {
            screen: "Products",
            params: {
                screen: 'ManageProduct',
                params: {
                    productId: id
                }
            }
        })
    }

    return (


        <View className="flex-1    ">
            <FlashList
                data={products}
                numColumns={layout.col}
                showsVerticalScrollIndicator={false}
                masonry={true}
                contentContainerStyle={{paddingBottom: 20, gap: 8}}
                contentContainerClassName={"gap-2 pb-20"}
                renderItem={({item}) => {
                    return       <EnhancedItem onPress={()=>navigateManageProduct(item.id)} product={item} layout={layout.layout === "ROW"} />
                }}
                keyExtractor={({id}) => id.toString()}

            />

        </View>


    );
}

interface EnhanceItemProps {
    product: ModelProducts
    layout: boolean,
    onPress: () => void
}

const Item = ({product,layout,onPress}:EnhanceItemProps) => {
    const {name, description, price, imageUrl} = product

    return (
        <View style={{margin: 3}}>

            <ProductCard horizontal={layout}
                         onPress={onPress}
                         price={price} name={name}
                         description={description ?? ""}
                         image={imageUrl}
            />

        </View>
    )
}
const enhanceProduct = withObservables(['product'], ({product}) => ({
    product
}))

const EnhancedItem = enhanceProduct(Item)


const productRepository = new ProductRepository()

const enhance = withObservables(
    ["search"],
    ({search}: { search: string }) => ({
        products: productRepository.getAllProducts(search)
    }))

export default enhance(Products);
