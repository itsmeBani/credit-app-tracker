import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import {SafeAreaContainer} from "../../../../shared/components/SafeLayoutContainer";
import {View} from "react-native";
import Title from "../../../../shared/components/Title";
import IconButton from "../../../../shared/components/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import HeaderNavigation from "../../../../shared/components/HeaderNavigation";

function CustomerItemsCreditScreen() {

    const navigation=useNavigation()


    return (
        <SafeAreaContainer>
            <View className="flex-1  w-full   ">
                <HeaderNavigation onPress={()=>navigation.goBack()}
                    title={"Manage Items"}

                    description={"View, manage, and track all credit items."}
                />

                <View className="flex py-2 w-full flex-row  gap-2">
                    <IconButton

                                icon={<AntDesign name="plus" size={15} color="white" />}
                                label={"New"}
                    />
                </View>

            </View>
        </SafeAreaContainer>

    );
}

export default CustomerItemsCreditScreen;