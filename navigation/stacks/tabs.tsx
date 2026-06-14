import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import HomeScreen from "../../features/home/screens/HomeScreen";
import {DashboardIcon, HomeIcon, SearchIcon} from "../../shared/components/BottomTabsIcons";
import ProductsScreen from "../../features/products/screen/ProductsScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SearchProductScreen from "../../features/products/screen/child-screen/SearchProductScreen";
import CustomerScreen from "../../features/customers/screens/CustomerScreen";
import * as React from "react";
import DashboardScreen from "../../features/dashboard/screens/DashboardScreen";
import {CustomTabBar} from "../customTabBar";

export const Tabs = createBottomTabNavigator({
    tabBar: (props) => <CustomTabBar {...props} />,
    initialRouteName:"Dashboard",
    screenOptions:{

    },
    screens: {
        Home: {
            screen: HomeScreen,
            options: {
                headerShown: false,
                tabBarIcon: ({ color,focused }) => (
                    <HomeIcon color={color} filled={focused} size={25}/>
                ),

            }
        },

        Products: {
            screen: ProductsScreen,
            options: {
                headerShown: false,

                tabBarIcon: ({ color,focused }) => (
                    <MaterialCommunityIcons name={focused ? "package-variant" : "package-variant-closed"}
                                            color={color} size={25}/>),
            }
        },
        Search:{
            screen: SearchProductScreen,
            options: {
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <SearchIcon size={26} color={color} filled={focused}/>
                )
                ,


            }
        },
        Customers: {
            screen: CustomerScreen,
            options: {
                headerShown: false,
                tabBarIcon: ({ color,focused }) => (
                    <MaterialCommunityIcons
                        name={focused ? "account-supervisor-circle" : "account-supervisor-circle-outline"} size={25}
                        color={color}/>)

            }
        },


        Dashboard: {
            screen: DashboardScreen,
            options: {
                headerShown: false,
                tabBarIcon: ({ color,focused }) => (
                    <DashboardIcon size={25} color={color} filled={focused}/>)
            }
        },

    },
});
