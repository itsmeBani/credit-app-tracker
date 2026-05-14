import React from 'react';
import {FlatList, Text, View} from "react-native";
import ProductCard from "./ui/product/ProductCard";
import {ProductsProps} from "../types";
import {useNavigation} from "@react-navigation/native";
import {withObservables} from "@nozbe/watermelondb/react";
import {formatGridData} from "../../../shared/utils/gridDataFormatter";
import {GRID_COLUMN} from "../../../shared/utils/constant";
import {ProductRepository} from "../data/product.repository";


function Products({products}:ProductsProps) {

    const navigation=useNavigation()

    const navigateManageProduct=(id:string)=>{
        navigation.navigate('Main', {
            screen: 'ManageProduct',
             params:{
                productId:id
             }
        })
    }

    return (



            <View className="flex-1  pt-4  ">
                <FlatList
                    data={formatGridData(products,GRID_COLUMN)}
                    numColumns={GRID_COLUMN}
                   showsVerticalScrollIndicator={false}
                    columnWrapperClassName={"gap-2"}
                    contentContainerStyle={{paddingBottom:20}}
                    contentContainerClassName={"gap-2 pb-20"}
                    renderItem={({ item }) => {

                        if ("empty" in item) {
                            return <View style={{ flex: 1, margin: 6 }} />;
                        }
                        return <ProductCard  onPress={()=>navigateManageProduct(item.id)} data={item} />;
                    }}
                      keyExtractor={({id})=>id.toString()}

                />

            </View>


    );
}
const productRepository=new ProductRepository()
const enhance = withObservables(
    ["search"],
    ({ search   }:{search:string} ) => ({
        products: productRepository.getAllProducts(search).observeWithColumns([
            "name",
            "description",
            "image_url",
            "price",
            "status",
            "updated_at",
            "_status",
        ])
    })
);

export default enhance(Products);
