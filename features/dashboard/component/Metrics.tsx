import React from 'react';
import {View} from "react-native";
import MetricCard from "./ui/MetricCard";
import {withObservables} from "@nozbe/watermelondb/react";
import {customersRepository} from "../../customers/services/customers.service";
import {productRepository} from "../../products/services/product.service";
import {IMetric} from "../types";
import productCategory from "../../products/components/ProductCategory";
import {categoryRepository} from "../../products/services/category.service";
import {creditRepository} from "../../customers_credit/data/credits.repository";
import {calculateAllOutstandingBalance} from "../hook/calculateAllOutstandingBalance";

function Metrics({customersCount,productsCount,productCategoriesCount,creditCount,credit}:IMetric) {
  const balance=calculateAllOutstandingBalance(credit)
    console.log("rerender")
    return (
        <View className={"gap-2 pt-3"}>


            <View className={"flex flex-row gap-2"}>
                <MetricCard
                    icon={"wallet-bifold-outline"}
                    title="Balance"
                    subtitle="Outstanding payments"
                    value={balance}
                    format={"currency"}
                    iconColor={"#3B82F6"}
                    iconBg={"#DBEAFE"}
                />
            </View>


            <View className={"flex flex-row gap-2"}>
                <MetricCard
                    icon={"package-variant-closed"}
                    title="Products"
                    value={productsCount}
                    subtitle="Total Products"
                    iconColor={"#8B5CF6"}
                    iconBg={"#EDE9FE"}
                />



                <MetricCard
                    title="Categories"
                    value={productCategoriesCount}
                    subtitle="Total Product Categories"
                    icon={"shape-outline"}
                    iconColor={"#8B5CF6"}
                    iconBg={"#EDE9FE"}
                />
            </View>


            <View className={"flex flex-row gap-2"}>
                <MetricCard
                    title="Credits"
                    value={creditCount}
                    icon={"clipboard-text-outline"}
                    subtitle="Total Credits"
                    iconColor={"#fb8f8f"}
                    iconBg={"rgba(254,226,226,0.55)"}
                />
                <MetricCard
                    title="Customers"
                    value={customersCount ?? 0}
                    subtitle="Total Customers"
                    icon={"account-circle-outline"}
                    iconColor={"#22C55E"}
                    iconBg={"rgba(220,252,231,0.7)"}
                />
            </View>

        </View>
    );
}
const enhance = withObservables([], () => ({
    customersCount: customersRepository.getObservedCustomerCount(),
    productsCount:productRepository.getObservedProductCount(),
    productCategoriesCount:categoryRepository.getObservedProductCategoryCount(),
    creditCount:creditRepository.getObservedCreditCount(),
    credit:creditRepository.getActiveCreditDebts()
}));
export default enhance(Metrics);