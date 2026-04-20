import * as React from 'react';

import "./global.css"


import Navigation from "./navigation/root";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {DatabaseProvider} from "@nozbe/watermelondb/react";
import {localDatabase} from "./local_database";

const queryClient = new QueryClient()


export default function App() {


    return (
     <DatabaseProvider database={localDatabase}>
         <QueryClientProvider client={queryClient}>
             <Navigation/>

         </QueryClientProvider>
     </DatabaseProvider>
    )
}