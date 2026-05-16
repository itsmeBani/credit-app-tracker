import React, {Suspense, useState} from 'react';


import ProductCategory from "../components/ProductCategory";


import Title from "../../../shared/components/Title";

import {ActivityIndicator, View} from "react-native";

import Products from "../components/Products";


import {GestureHandlerRootView} from "react-native-gesture-handler";


import CreateButton from "../components/CreateButton";
import Search from "../../../shared/components/Search";
import {SafeAreaContainer} from "../../../shared/components/SafeLayoutContainer";


function ProductsContent() {


   const  [search,setSearch]=useState("")


    return (
        <GestureHandlerRootView className={"flex-1"}>
            <SafeAreaContainer disablePaddingBottom={true}  >
                <Title   description={"Create, edit, and organize your products easily."} title={"Manage Product"} align={"center"}/>


                <Search
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search products..."
                />
                <CreateButton/>
                <ProductCategory/>
                <Products   search={search} />
            </SafeAreaContainer>
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