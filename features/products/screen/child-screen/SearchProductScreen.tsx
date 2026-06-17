import React, {useState} from 'react';
import {View} from "react-native";
import {SafeAreaContainer} from "../../../../shared/components/SafeLayoutContainer";
import HeaderNavigation from "../../../../shared/components/HeaderNavigation";
import Search from "../../../../shared/components/Search";
import Products from "../../components/Products";
import Title from "../../../../shared/components/Title";
import {useDebounce} from "../../../../shared/hooks/useDebounce";

function SearchProductScreen() {

    const [search,setSearch]=useState("")
    const debounceSearch=useDebounce(search,1000)
    return (
        <SafeAreaContainer disablePaddingBottom={true}>
            <Title title={"Search Products"} description={"Browse available products"}/>

             <Search value={search} onChangeText={setSearch}
             placeholder={"Browse Products"}
             />

            <Products layout={{layout:"ROW", col:1}} search={debounceSearch}  />
        </SafeAreaContainer>
    );
}




export default SearchProductScreen;

