import React, {useState} from 'react';
import {View} from "react-native";
import {SafeAreaContainer} from "../../../../shared/components/SafeLayoutContainer";
import HeaderNavigation from "../../../../shared/components/HeaderNavigation";
import Search from "../../../../shared/components/Search";
import Products from "../../components/Products";
import Title from "../../../../shared/components/Title";

function SearchProductScreen() {

    const [search,setSearch]=useState("")
    return (
        <SafeAreaContainer>
            <Title title={"Search Products"} description={"Browse available products"}/>

             <Search value={search} onChangeText={setSearch}
             placeholder={"Browse Products"}
             />

            <Products layout={{layout:"ROW", col:1}} search={search}  />
        </SafeAreaContainer>
    );
}




export default SearchProductScreen;

