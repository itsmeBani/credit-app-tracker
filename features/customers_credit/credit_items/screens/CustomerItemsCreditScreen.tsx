import React, {useRef} from "react";
import {View} from "react-native";

import HeaderNavigation from "../../../../shared/components/HeaderNavigation";

import AntDesign from "@expo/vector-icons/AntDesign";

import CreateItemCreditModal, {CreateItemCreditModalRef} from "../components/CreateItemCreditModal";
import {SafeAreaContainer} from "../../../../shared/components/SafeLayoutContainer";
import CustomerItemsCredit from "../components/CustomerItemsCredit";
import ItemsTotalCard from "../components/ItemsTotalCard";
import {CustomerItemsCreditParams} from "../types";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import Button from "../../../../shared/components/Button";

function CustomerItemsCreditScreen({
                                       route,
                                   }: CustomerItemsCreditParams) {
    const {creditId} = route.params;

    const modalRef = useRef<BottomSheetModal>(null);

    if (!creditId) return null;


    const openCreateItemModal=()=>{
        modalRef.current?.present()
    }
    return (
        <SafeAreaContainer horizontalPadding={0} >
            <HeaderNavigation title={"Manage Items"} description={"View, Manage, and track all credit items"}/>
            <View className="flex-1 px-3 w-full">


                <View className="flex-row py-2 gap-2">
                    <Button
                        icon={
                            <AntDesign
                                name="plus"
                                size={15}
                                color="white"
                            />
                        }
                        label={"New"}
                        onPress={openCreateItemModal}
                    />
                </View>

                <CustomerItemsCredit  creditId={creditId}/>

            </View>

            <ItemsTotalCard creditId={creditId} />

            <CreateItemCreditModal creditId={creditId} ref={modalRef} />

        </SafeAreaContainer>
    );
}

export default CustomerItemsCreditScreen;