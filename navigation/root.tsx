import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import HomeScreen from "../features/home/screens/HomeScreen";
import ProductsScreen from "../features/products/screen/ProductsScreen";
import CustomerScreen from "../features/customers/screens/CustomerScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../features/authentication/screens/Login";
import {createStaticNavigation, StaticParamList} from "@react-navigation/native";
import * as React from "react";
import ManageProductScreen from "../features/products/screen/child-screen/ManageProductScreen";
import {Button, Text, useColorScheme, View} from "react-native";


import {StatusBar} from "expo-status-bar";
import {useSyncActions} from "../features/sync/store/sync";
import {useDatabase} from "@nozbe/watermelondb/hooks";
import {useSyncOnDatabaseChange} from "../features/sync/hook/useDatabaseChanges";
import {useAutoSyncOnNetwork} from "../shared/hooks/useAutoSyncOnNetwork";
import CreateCategoryScreen from "../features/products/screen/child-screen/CreateCategoryScreen";
import {ImageUploadService} from "../features/uploads/services/ImageUploadService";
import {DarkCustomTheme, LightTheme} from "../shared/utils/constant";
import CustomerCreditScreen from "../features/customers/screens/child-screens/CustomerCreditScreen";
import CreateCustomerScreen from "../features/customers/screens/child-screens/CreateCustomerScreen";
import CustomerItemsCreditScreen from "../features/customers/screens/child-screens/CustomerItemsCreditScreen";
import {SafeAreaView} from "react-native-safe-area-context";
import HeaderNavigation from "../shared/components/HeaderNavigation";
import Title from "../shared/components/Title";

const Tabs = createBottomTabNavigator({

    screenOptions: ({route}) => ({
        tabBarIcon: ({focused, color, size}) => {


            if (route.name === 'Home') {
                return <Octicons name={focused ? "home-fill" : "home"} size={22} color={color}/>;
            } else if (route.name === 'Customers') {
                return <MaterialCommunityIcons
                    name={focused ? "account-supervisor-circle" : "account-supervisor-circle-outline"} size={24}
                    color={color}/>;
            } else if (route.name === 'Products') {
                return <MaterialCommunityIcons name={focused ? "package-variant" : "package-variant-closed"}
                                               color={color} size={24}/>;
            } else if (route.name === 'Dashboard') {
                return <MaterialCommunityIcons name={focused ? "view-dashboard" : "view-dashboard-outline"}
                                               color={color} size={22}/>;
            }

        },
        tabBarActiveTintColor: '#2179ff',
        tabBarInactiveTintColor: 'gray',


    }),
    screens: {
        Home: {
            screen: HomeScreen,
            options: {
                headerShown: false

            }
        },

        Products: {
            screen: ProductsScreen,
            options: {
                headerShown: false,

            }
        },
        Customers: {
            screen: CustomerScreen,
            options: {
                headerShown: false

            }
        },

        Dashboard: {
            if: () => true,
            screen: HomeScreen,
            options: {
                headerShown: false

            }
        },

    },
});


const MainStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,

    },
    screens: {
        Tabs: Tabs,
        Customers: {
            screen: CustomerScreen,
        },
        CustomerCredit: {
            screen: CustomerCreditScreen,


        },
        CreateCustomer: {
            screen: CreateCustomerScreen,

        },
        ManageProduct: {
            screen: ManageProductScreen,

        },
        CreateCategory: {
            screen: CreateCategoryScreen
        },
        ManageCustomerItemsCredit: {
            screen: CustomerItemsCreditScreen,
            // title={"Manage Items"} description={"View, Manage, and track all credit items"}
        }
    },
})

const RootStack = createNativeStackNavigator({
    screens: {
        Main: {

            screen: MainStack,
            options: {
                headerShown: false
            }
        },
        Login: {

            screen: Login,
            options: {
                headerShown: false
            }
        }
    },
});


type RootStackParamList = StaticParamList<typeof RootStack>

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}

export const RootNavigation = createStaticNavigation(RootStack);


export default function Navigation() {
    const scheme = useColorScheme();
    const theme = scheme === "dark" ? DarkCustomTheme : LightTheme;
    const {sync} = useSyncActions()

    const database = useDatabase();


    useSyncOnDatabaseChange({
        database: database,
        tables: ["products", "customers", "credits", "product_categories"],
        delay: 20000,
        onSyncTrigger: async () => {

            await sync()
        },
    })


    useAutoSyncOnNetwork({
        sync: async () => {
            await sync();
        },
    })


    return (
        <>

            <RootNavigation theme={theme}/>
            <StatusBar translucent={true}/>
        </>
    )
}
