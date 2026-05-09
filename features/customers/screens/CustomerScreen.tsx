import React, {useState} from 'react';
import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Title from "../../../shared/components/Title";
import Search from "../../../shared/components/Search";
import {SafeAreaContainer} from "../../../shared/components/SafeLayoutContainer";
import CustomerCard from "../component/ui/CustomerCard";
import Customers from "../component/Customers";
import IconButton from "../../../shared/components/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";


function CustomerScreen() {
      const [search,setSearch]=useState("")
     const navigation=useNavigation()

    const navigateCustomerCreditScreen=()=>{
        navigation.navigate('Main', {
            screen: 'CreateCustomer',
        })
    }
      return (
          <SafeAreaContainer>
              <View className="flex-1  w-full   ">
                  <Title
                      title={"Customers"}
                      align={"center"}
                      description={"View, manage, and track all customer credits."}
                  />
                  <Search
                      value={search}
                      onChangeText={setSearch}
                      placeholder="Search products..."
                  />
                  <View className="flex py-2 w-full flex-row  gap-2">
                     <IconButton onPress={navigateCustomerCreditScreen}

                         icon={<AntDesign name="plus" size={15} color="white" />}
                         label={"Customer"}
                     />
                 </View>
                 <Customers  search={""}  />
              </View>
          </SafeAreaContainer>

    );
}

export default CustomerScreen;