import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ManageProductScreen from "../../features/products/screen/child-screen/ManageProductScreen";

import CreateCategoryScreen from "../../features/products/screen/child-screen/CreateCategoryScreen";

export const ProductStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        ManageProduct: {
            screen: ManageProductScreen,

        },
        CreateCategory: {
            screen: CreateCategoryScreen
        },
    }
})
