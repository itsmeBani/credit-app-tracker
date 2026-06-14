import * as React from 'react';

import "./global.css"


import {Navigation} from "./navigation/root";


import {DatabaseProvider} from "@nozbe/watermelondb/react";
import {localDatabase} from "./local_database";
import {Toaster} from 'sonner-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {KeyboardProvider} from "react-native-keyboard-controller";
import { PaperProvider } from 'react-native-paper';
export default function App() {


    return (
        <SafeAreaProvider>
            <PaperProvider>
            <GestureHandlerRootView>

                <DatabaseProvider database={localDatabase}>

                         <KeyboardProvider>
                             <Navigation/>

                         </KeyboardProvider>

                        <Toaster
                            theme={"system"}
                            autoWiggleOnUpdate={"toast-change"}
                            swipeToDismissDirection={"left"}
                            richColors={true}
                            duration={1000}
                            style={{elevation: 0.7}}/>
                </DatabaseProvider>
            </GestureHandlerRootView>
            </PaperProvider>
        </SafeAreaProvider>

    )
}