import React, {useRef} from "react";
import {View} from "react-native";
import IconButton from "../../../../shared/components/IconButton";
import HeaderNavigation from "../../../../shared/components/HeaderNavigation";

import AntDesign from "@expo/vector-icons/AntDesign";

import {CustomerItemsCreditParams} from "../../types";
import CreateItemCreditModal, {CreateItemCreditModalRef} from "../../component/CreateItemCredit";
import {SafeAreaContainer} from "../../../../shared/components/SafeLayoutContainer";
import CustomerItemsCredit from "../../component/CustomerItemsCredit";
import ItemsTotalCard from "../../component/ui/ItemsTotalCard";

function CustomerItemsCreditScreen({
                                       route,
                                   }: CustomerItemsCreditParams) {
    const {creditId} = route.params;

    const modalRef = useRef<CreateItemCreditModalRef>(null);

    if (!creditId) return null;


    const openCreateItemModal=()=>{
        modalRef.current?.open()
    }
    return (
        <SafeAreaContainer horizontalPadding={0}>
            <HeaderNavigation title={"Manage Items"} description={"View, Manage, and track all credit items"}/>
            <View className="flex-1 px-3 w-full">


                <View className="flex-row py-2 gap-2">
                    <IconButton
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

                <CustomerItemsCredit creditId={creditId}/>

            </View>

            <ItemsTotalCard creditId={creditId} />

            <CreateItemCreditModal creditId={creditId} ref={modalRef} />

        </SafeAreaContainer>
    );
}

export default CustomerItemsCreditScreen;