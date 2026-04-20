import React, {Suspense, useRef, useState} from 'react';


import ProductCategory from "../ProductCategory";

import {SafeAreaContainer} from "../../../shared/components/SafeLayoutContainer";
import Search from "../../../shared/components/Search";

import Title from "../../../shared/components/Title";

import {ActivityIndicator, View} from "react-native";

import Products from "../Products";

import SyncButton from "../../sync/components/SyncButton";
import {GestureHandlerRootView} from "react-native-gesture-handler";

import SyncDetails from "../../sync/SyncDetails";
import {useProductActions, useProductSearch} from "../store/store.products";
import {values} from "@nozbe/watermelondb/utils/fp";


function ProductsContent() {


   const  search=useProductSearch()
    const  {setSearch}=useProductActions()


    return (
        <GestureHandlerRootView className={"flex-1"}>
            <SafeAreaContainer>
                <View className="w-full  items-end px-4">
                    <SyncButton></SyncButton>
                </View>
                <Title title={"Manage Product"} align={"center"}/>

                <Search
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search products..."
                />
                <ProductCategory/>
                <Products search={search} />

            </SafeAreaContainer>

            <SyncDetails/>

        </GestureHandlerRootView>

    );
}


export default function ProductsScreen() {
    return (
        <Suspense
            fallback={
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large"/>
                </View>
            }
        >
            <ProductsContent/>
        </Suspense>
    );
}