import React, {useState} from 'react';
import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Title from "../../../shared/components/Title";
import Search from "../../../shared/components/Search";


function CustomerScreen() {
      const [search,setSearch]=useState("")

    return (
        <View className="flex-1 items-center bg-white justify-center ">
            <Title title={"Customers"} align={"center"}/>
            <Search
                value={search}
                onChangeText={setSearch}
                    placeholder="Search products..."
            />
        </View>
    );
}

export default CustomerScreen;