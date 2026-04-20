import React from 'react';
import {FlatList, View } from "react-native";
import ProductCard from "./components/ProductCard";
import {GridItem, ProductsProps} from "./types";
import {useNavigation} from "@react-navigation/native";
import ModelProducts from "../../local_database/model/model.products";
import {withObservables} from "@nozbe/watermelondb/react";
import {localDatabase} from "../../local_database";
import ModelProductCategory from "../../local_database/model/model.productCategory";
import {Q} from "@nozbe/watermelondb";
import {useProductSearch} from "./store/store.products";



function Products({products}:ProductsProps) {
    console.log(products)
    const navigation=useNavigation()
    const NUMBER_COLUMN = 2;


    const formatGridData = (data: ModelProducts[]): GridItem[] => {

        const newData: GridItem[] = [...data];

        const fullRows = Math.floor(newData.length / NUMBER_COLUMN);
        let lastRowElements = newData.length - fullRows * NUMBER_COLUMN;

        while (lastRowElements !== NUMBER_COLUMN && lastRowElements !== 0) {
            newData.push({
                id: `empty-${lastRowElements}`,
                empty: true,
            });
            lastRowElements++;
        }
        return newData;
    };


    const navigateManageProduct=(id:string)=>{
        navigation.navigate('Main', {
            screen: 'ManageProduct',
             params:{
                productId:id
             }
        })
    }


    return (



            <View className=" flex-1  px-4">
                <FlatList
                    data={formatGridData(products)}
                    numColumns={NUMBER_COLUMN}
                   showsVerticalScrollIndicator={false}
                    columnWrapperClassName={"gap-2"}
                    contentContainerClassName={"gap-2 pb-10"}
                    renderItem={({ item }) => {

                        if ("empty" in item) {
                            return <View style={{ flex: 1, margin: 6 }} />;
                        }
                        return <ProductCard onPress={()=>navigateManageProduct(item.id)} data={item} />;
                    }}
                      keyExtractor={({id})=>id.toString()}

                />
            </View>


    );
}

const enhance = withObservables(
    ["search"],
    ({ search   }:{search:string} ) => ({
        products: localDatabase
            .get<ModelProducts>("products")
            .query(
                Q.where(
                    "name",
                    Q.like(`%${Q.sanitizeLikeString(search)}%`)
                )
            )
            .observeWithColumns([
                "name",
                "description",
                "image_urls",
                "price",
                "status",
                "updated_at",
                "_status",
            ]),
    })
);

export default enhance(Products);
