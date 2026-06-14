import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DashboardScreen from "../../features/dashboard/screens/DashboardScreen";

export const DashboardStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Dashboard:{
            screen:DashboardScreen
        }
    }
})