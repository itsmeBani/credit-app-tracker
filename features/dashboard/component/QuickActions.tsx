import React from 'react';
import {ScrollView, Text, View} from "react-native";
import ActionCard from "./ui/ActionCard";
import {useNavigation, useTheme} from "@react-navigation/native";

function QuickActions() {
    const {colors}=useTheme()
    const navigation = useNavigation();

    const goToCreateProduct = () => {
        navigation.navigate('Authenticated', {
            screen:"Products",
            params:{
                screen: 'ManageProduct',
                params:{
                }
            }
        })
    };
    const goToCreateProductCategory = () => {
        navigation.navigate('Authenticated', {
            screen:"Products",
            params:{
                screen: 'CreateCategory',

            }
        })
    };
    const navigateCreateCustomerScreen=()=>{
        navigation.navigate("Authenticated", {
            screen: 'Customers',
            params : {
                screen:"CreateCustomer"
            }
        })
    }
    return (
        <View className={"py-4 flex-1 "}>
            <Text className={"font-jakarta text-slate-700 pb-3 text-sm font-bold"}>
                Quick Actions
            </Text>

            <View className={"flex flex-row flex-wrap gap-2"}>
               <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:8}}>
                   <ActionCard
                       title="Add Product"
                       icon="package-variant-closed-plus"
                       onPress={goToCreateProduct}
                       backgroundColor={colors.card}
                       iconColor={colors.primary}
                   />
                   <ActionCard
                       title="Add Category"
                       icon="shape-plus-outline"
                       onPress={goToCreateProductCategory}
                       backgroundColor={colors.card}
                       iconColor={colors.primary}
                   />
                   <ActionCard
                       title="Add Customer"
                       icon="account-plus-outline"
                       onPress={navigateCreateCustomerScreen}
                       backgroundColor={colors.card}
                       iconColor={colors.primary}
                   />

               </ScrollView>
            </View>
        </View>
    );
}

export default QuickActions;