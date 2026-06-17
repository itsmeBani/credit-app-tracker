import React from 'react';
import {SafeAreaContainer} from "../../../shared/components/SafeLayoutContainer";

import Metrics from "../component/Metrics";
import QuickActions from "../component/QuickActions";
import {Text, View} from "react-native";


function DashboardScreen() {
    return (
        <SafeAreaContainer>
            <View className="p-2">
                <Text className="font-jakarta dark:text-white text-2xl font-bold text-slate-800">
                    Good day, Admin
                </Text>
                <Text className="font-jakarta dark:text-gray-200  font-medium text-xs text-slate-600 mt-1">
                    Here's a quick overview of your store’s credits, products, and customers.
                </Text>
            </View>
             <Metrics/>
            <QuickActions/>
        </SafeAreaContainer>
    );
}
export default DashboardScreen;