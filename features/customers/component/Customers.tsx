import React from 'react';
import {FlatList, View} from "react-native";
import CustomerCard from "./ui/CustomerCard";
import {useNavigation} from "@react-navigation/native";
import {withObservables} from "@nozbe/watermelondb/react";
import {CustomersRepository} from "../data/customers.repository";
import {CustomersProps} from "../types";

function Customers({customers} :CustomersProps) {

    const navigation=useNavigation()

    const navigateCustomerCreditScreen=(id:string)=>{
        navigation.navigate('Main', {
            screen: 'CustomerCredit',
            params:{
                id:id
            }
        })
    }
    return (
        <View className="flex-1">


            <FlatList
                data={customers}

                showsVerticalScrollIndicator={false}

                contentContainerStyle={{paddingBottom:20}}
                contentContainerClassName={"gap-2 pb-20"}
                renderItem={({ item }) => <CustomerCard data={item} onClick={()=>navigateCustomerCreditScreen(item.id)}  />}
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

