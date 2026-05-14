import React from 'react';
import {Text, useColorScheme, View} from "react-native";
import {ImageOff, Package, PackageOpenIcon} from "lucide-react-native";

function CreditEmpty() {
    const theme = useColorScheme();
    return (
        <View className="flex items-center justify-center px-6">


            <View className=" p-6 bg-blue-50 dark:bg-transparent rounded-full ">


                <Package  size={50} strokeWidth={1.2} color={theme === "dark" ? "#E2E8F0" : "#64748B"}   />

            </View>


            <Text
                className="text-md  text-slate-500 dark:text-white font-semibold font-jakarta"
            >
                Start adding credit to this customer
            </Text>


            <Text
                className="text-slate-500 text-xs dark:text-white text-center mb-6 font-jakarta"
            >
              this customer has no credit yet, Add credit by clicking credit button
               </Text>



        </View>

    );
}

export default CreditEmpty;