import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomerCreditScreen from "../../features/customers_credit/credits/screens/CustomerCreditScreen";
import CustomerItemsCreditScreen from "../../features/customers_credit/credit_items/screens/CustomerItemsCreditScreen";
import CreateCustomerScreen from "../../features/customers/screens/CreateCustomerScreen";

export const CustomerStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        CustomerCredit: {
            screen: CustomerCreditScreen,

        },

        ManageCustomerItemsCredit: {
            screen: CustomerItemsCreditScreen,
        },
        CreateCustomer: {
            screen: CreateCustomerScreen,
            // options:{
            //     presentation: 'formSheet',
            //     sheetAllowedDetents: [0.95],
            //     sheetCornerRadius: 20,
            // }
        },
    }
})
