import React from "react";
import { View, FlatList } from "react-native";
import {CategoryProps} from "./types";
import CategoryCard from "./components/CategoryCard";
import Title from "../../shared/components/Title";
import {useCategories, useCategoryActions} from "./store/store.category";
import {withObservables} from "@nozbe/watermelondb/react";
import {Button} from "@react-navigation/elements";
import {localDatabase} from "../../local_database";
import ModelProductCategory from "../../local_database/model/model.productCategory";


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
                contentContainerStyle={{ padding: 20,paddingTop:10,gap:13 }}
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
const enhance = withObservables([], () => ({
    categories: localDatabase
        .get<ModelProductCategory>("product_categories")
        .query().observeWithColumns([
            "name",
            "description",
            "image_url",
            "background_color",
            "updated_at",
            "_status"
        ])

}));

export default enhance(ProductCategory);