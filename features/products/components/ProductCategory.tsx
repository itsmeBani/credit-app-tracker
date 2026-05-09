import React from "react";
import {FlatList, View} from "react-native";
import {CategoryProps} from "../types";
import CategoryCard from "./ui/CategoryCard";
import Title from "../../../shared/components/Title";
import {useCategories, useCategoryActions} from "../store/store.category";
import {withObservables} from "@nozbe/watermelondb/react";
import {ProductCategoryRepository} from "../data/category.repository";


function ProductCategory({ categories}: CategoryProps) {

    const activeCategory =useCategories()
    const {setActiveCategory}=useCategoryActions()




    return (
        <View className={""}>

        <View className="flex justify-between w-full flex-row">
            <Title title={"Category"} align={"left"} />
        </View>
              <FlatList
                data={categories}
                extraData={categories}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                overScrollMode={"never"}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingTop:10,gap:13 }}
                renderItem={({ item }) => {

                    return (
                        <CategoryCard
                            item={item}
                            isActive={activeCategory === item.name}
                            onPress={()=>setActiveCategory(item.name)}
                        />
                    );
                }}
            />
        </View>
    );
}
const productCategoryRepository=new ProductCategoryRepository()

const enhance = withObservables([], () => ({
    categories:productCategoryRepository.getObservedProductCategories()

}));

export default enhance(ProductCategory);