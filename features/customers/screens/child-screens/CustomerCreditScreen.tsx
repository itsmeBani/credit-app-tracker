import React, {useEffect, useRef} from 'react';
import {FlatList, View} from "react-native";
import {SafeAreaContainer} from "../../../../shared/components/SafeLayoutContainer";
import {CustomerCreditParams, CustomerCreditsProps} from "../../types";
import HeaderNavigation from "../../../../shared/components/HeaderNavigation";
import {useNavigation} from "@react-navigation/native";
import CustomerCreditStatus from "../../component/ui/CustomerCreditStatus";
import IconButton from "../../../../shared/components/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import {useCreditsActions, useCustomerCredits} from "../../store/store.credits";
import BottomSheet from "@gorhom/bottom-sheet";
import ActionBottomSheet from "../../../../shared/components/ActionSheetModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


function CustomerCreditScreen({route}: CustomerCreditParams) {
    const {id} = route.params

    const {createCredits, getCustomerCredits} = useCreditsActions()

   const credits=useCustomerCredits()

    useEffect(() => {
        getCustomerCredits(id)
    }, [id]);

    const navigation = useNavigation();

    const bottomSheetRef = useRef<BottomSheet>(null);

    const back = () => navigation.goBack();

    const navigateCustomerItemsCreditScreen=()=>{
        navigation.navigate('Main', {
            screen: 'ManageCustomerItemsCredit',
        })
    }
    const openBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };

    const handleCreateCredits=()=>{
          createCredits(id)
          bottomSheetRef?.current?.close();
    }



    return (

        <SafeAreaContainer>
            <View className="flex-1  w-full   ">
                <HeaderNavigation onPress={back}
                                  title={"Customer Credit"}
                                  description={"Add a new credit to the customer."}
                />
                <View className=" flex items-start py-3">
                    <IconButton onPress={openBottomSheet}

                                icon={<AntDesign name="plus" size={15} color="white"/>}
                                label={"Credit"}
                    />
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={credits}

                    contentContainerClassName={"gap-2 pb-20"}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <CustomerCreditStatus key={item.id} onPress={()=>{navigateCustomerItemsCreditScreen()}} data={item}/>
                    )}
                />

            </View>
            <ActionBottomSheet
                ref={bottomSheetRef}
                icon={<MaterialCommunityIcons name="alert-circle-outline" size={18} color={"#2563eb"} />}
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

// const creditsRepository = new CreditsRepository();
//
// const enhance = withObservables(
//     ["route"],
//     ({route}: CustomerCreditParams) => {
//         const {id} = route.params;
//         return {
//             credits: creditsRepository.getObservedCredits(id),
//         };
//     }
// );
//
// export default enhance(CustomerCreditScreen)
//
//

export default CustomerCreditScreen