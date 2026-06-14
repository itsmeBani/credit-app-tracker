import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AddPaymentScreen from "../../features/payment/screens/AddPaymentScreen";
import ViewPaymentHistory from "../../features/payment/screens/ViewPaymentHistory";

export const PaymentStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        AddPayment: {
            screen: AddPaymentScreen,
        },

        PaymentHistory: {
            screen: ViewPaymentHistory,
        },
    },
});