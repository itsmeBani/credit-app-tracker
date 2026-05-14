import React from 'react';
import {FlatList, View} from "react-native";
import CustomerCard from "./ui/CustomerCard";
import {useNavigation} from "@react-navigation/native";
import {withObservables} from "@nozbe/watermelondb/react";
import {CustomersRepository} from "../data/customers.repository";
import {CustomersProps} from "../types";
import {FlashList} from "@shopify/flash-list";

function Customers({customers} :CustomersProps) {

    const navigation=useNavigation()

    const navigateCustomerCreditScreen=(id:string,lastname:string,firstname:string)=>{
        navigation.navigate('Main', {
            screen: 'CustomerCredit',
            params:{
                id,
                lastname,
                firstname,

            }
        })
    }
    return (
        <View className="flex-1 ">


            <FlashList
                data={customers}

                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{height: 7}}/>}
                contentContainerStyle={{
                    paddingBottom:20
                }}
                renderItem={({ item }) => <CustomerCard data={item} onClick={()=>navigateCustomerCreditScreen(item.id,item.lastname,item?.firstname)}  />}
                keyExtractor={({id})=>id.toString()}

            />

        </View>
    );
}

const customersRepository=new CustomersRepository()
const enhance = withObservables(
    ["search"],
    ({ search   }:{search:string} ) => ({
        customers: customersRepository.getObservedCustomers(search)
    })
);

export default enhance(Customers);

