import React, {useRef} from 'react';
import {View} from "react-native";
import {SafeAreaContainer} from "../../../../shared/components/SafeLayoutContainer";
import {CustomerCreditParams} from "../../types";
import IconButton from "../../../../shared/components/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet from "@gorhom/bottom-sheet";
import ActionBottomSheet from "../../../../shared/components/ActionSheetModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomerCredits from "../../component/CustomerCredits";
import {creditsService} from "../../services/credits.service";
import HeaderNavigation from "../../../../shared/components/HeaderNavigation";

function CustomerCreditScreen({route}: CustomerCreditParams) {
     const {id,lastname,firstname} = route.params

    const bottomSheetRef = useRef<BottomSheet>(null);

    const openBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };

    const handleCreateCredits = async () => {
        await creditsService.createCredits(id)
        bottomSheetRef?.current?.close();
    }



    return (

        <SafeAreaContainer>

            <HeaderNavigation title={firstname + " " +lastname} description={"Manage Customer credits"}/>
             <View className="flex flex-row  justify-between pb-5 py-3">

                <IconButton
                    onPress={openBottomSheet}
                    icon={<AntDesign name="plus" size={15} color="white" />}
                    label={"Credit"}
                />
            </View>

                <CustomerCredits  creditId={id}/>




            <ActionBottomSheet
                ref={bottomSheetRef}
                icon={
                    <MaterialCommunityIcons
                        name="alert-circle-outline"
                        size={18}
                        color={"#2563eb"}
                    />
                }
                title="Create Credit"
                description="This will create a new credit record for the customer."
                confirmLabel="Create"
                cancelLabel="Cancel"
                onConfirm={handleCreateCredits}
                onCancel={() => bottomSheetRef.current?.close()}
            />
        </SafeAreaContainer>
    )
}


export default CustomerCreditScreen