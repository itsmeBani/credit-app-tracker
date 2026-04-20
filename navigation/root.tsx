import {BottomTabNavigationProp, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import HomeScreen from "../features/home/screens/HomeScreen";
import ProductsScreen from "../features/products/screen/ProductsScreen";
import CustomerScreen from "../features/customers/screens/CustomerScreen";
import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack";
import Login from "../features/authentication/screens/Login";
import {createStaticNavigation, StaticParamList} from "@react-navigation/native";
import * as React from "react";
import ManageProductScreen from "../features/products/screen/ManageProductScreen";
import {useColorScheme} from "react-native";
import {DarkCustomTheme, LightTheme} from "../shared/components/theme";
import {useEffect} from "react";
import {startNetworkListener} from "../shared/network.listener";
import {StatusBar} from "expo-status-bar";
import Ionicons from '@expo/vector-icons/Ionicons';
import {useSyncActions} from "../features/sync/store/sync";

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
                }
                else if (route.name === 'Dashboard') {
                    return <MaterialCommunityIcons  name={focused ? "view-dashboard" : "view-dashboard-outline"}
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
                if:()=>true,
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
        CustomerCredits: {
            screen: CustomerScreen,
            options: {
                title: "Credits",
            },
        },
        ManageProduct:{
            screen:ManageProductScreen,
        }

    },
});


const RootStack = createNativeStackNavigator({
    screens: {
        Main: {
            screen:MainStack,
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




export default function Navigation(){
    const scheme = useColorScheme();
    const theme = scheme === "dark" ? DarkCustomTheme : LightTheme;
   const  {sync}=useSyncActions()


    useEffect(() => {
        const unsubscribe = startNetworkListener(async () => {
            await sync()
        });  return () => unsubscribe();
    }, []);




return (
   <>

       <RootNavigation theme={theme} />
       <StatusBar translucent={true}/>
   </>
)
}
