import React, {Suspense} from 'react';


import ProductCategory from "../components/ProductCategory";


import Title from "../../../shared/components/Title";

import {ActivityIndicator, View} from "react-native";

import Products from "../components/Products";


import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaContainer} from "../../../shared/components/SafeLayoutContainer";
import SearchTrigger from "../../../shared/components/SearchBarTrigger";
import {useNavigation} from "@react-navigation/native";


function ProductsContent() {

const navigation=useNavigation()

    const navigateSearchScreen=()=>{
    navigation.navigate("Authenticated",{
        screen:"Tabs",
        params:{
            screen:"Search"
        }
    })
    }

    return (
        <GestureHandlerRootView className={"flex-1"}>
            <SafeAreaContainer disablePaddingBottom={true}  >
                <Title   description={"Create, edit, and organize your products easily."} title={"Manage Product"} align={"center"}/>

                <SearchTrigger placeholder={"Find products"} onPress={navigateSearchScreen}/>

                <ProductCategory/>
                <Products  search={""}  />
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