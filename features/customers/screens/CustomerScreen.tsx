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
import {SafeAreaView} from "react-native-safe-area-context";
import {useDebounce} from "../../../shared/hooks/useDebounce";


function CustomerScreen() {
      const [search,setSearch]=useState("")

      const debounceSearch=useDebounce(search,500)
     const navigation=useNavigation()

    const navigateCustomerCreditScreen=()=>{
        navigation.navigate('Main', {
            screen: 'CreateCustomer',
        })
    }
      return (
          <SafeAreaView edges={["top"]}  className={"flex-1 px-3 "}>
              <View className="  w-full  pb-3">
                  <Title title={"Customers"} description={"Manage Customer credits"}/>
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

              </View>
              <Customers  search={debounceSearch}  />
          </SafeAreaView>

    );
}

export default CustomerScreen;