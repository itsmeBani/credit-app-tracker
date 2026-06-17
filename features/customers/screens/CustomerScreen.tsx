import React, {useState} from 'react';
import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Title from "../../../shared/components/Title";
import Search from "../../../shared/components/Search";
import Customers from "../component/Customers";

import {useDebounce} from "../../../shared/hooks/useDebounce";
import {SafeAreaContainer} from "../../../shared/components/SafeLayoutContainer";


function CustomerScreen() {
      const [search,setSearch]=useState("")

      const debounceSearch=useDebounce(search,500)

      return (
          <SafeAreaContainer disablePaddingBottom={true}  >
              <View className="  w-full  pb-3">
                  <Title title={"Customers"} description={"Manage Customer credits"}/>
                  <Search
                      value={search}
                      onChangeText={setSearch}
                      placeholder="Find a customer"
                  />
              </View>
              <Customers  search={debounceSearch}  />
          </SafeAreaContainer>

    );
}

export default CustomerScreen;