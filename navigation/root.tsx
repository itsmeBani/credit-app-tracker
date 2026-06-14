import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../features/authentication/screens/Login";
import {createStaticNavigation, StaticParamList,} from "@react-navigation/native";
import * as React from "react";
import {useColorScheme} from "react-native";


import {StatusBar} from "expo-status-bar";
import {useSyncActions} from "../features/sync/store/sync";
import {DarkCustomTheme, LightTheme} from "../shared/utils/constant";
import {CustomerStack} from "./stacks/stack.customers";
import {PaymentStack} from "./stacks/stack.payment";
import {Tabs} from "./stacks/tabs";
import {ProductStack} from "./stacks/stack.product";

type RootStackParamList = StaticParamList<typeof RootStack>

    declare global {
        namespace ReactNavigation {
            interface RootParamList extends RootStackParamList {
            }
        }
    }


    const AuthenticatedStack = createNativeStackNavigator({
        screenOptions: {
            headerShown: false,


        },
        screens: {
            Tabs: Tabs,
            Customers: CustomerStack,
            Products:ProductStack,
            Payment:PaymentStack
        },
    })


    const RootStack = createNativeStackNavigator({
        screens: {
            Authenticated: {

                screen: AuthenticatedStack,
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




     const RootNavigation = createStaticNavigation(RootStack);


    export function Navigation() {
        const scheme = useColorScheme();
        const theme = scheme === "dark" ? DarkCustomTheme : LightTheme;
        const {sync} = useSyncActions()


        // useSyncOnDatabaseChange({
        //     database: database,
        //     tables: ["products", "customers", "credits", "product_categories","payments"],
        //     delay: 20000,
        //     onSyncTrigger: async () => {
        //
        //         await sync()
        //     },
        // })


        // useAutoSyncOnNetwork({
        //     sync: async () => {
        //         await sync();
        //     },
        // })


        return (
            <>

                <RootNavigation theme={theme}/>
                <StatusBar translucent={true}/>
            </>
        )
    }
