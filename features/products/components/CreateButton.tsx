import React from 'react';
import {View} from "react-native";
import IconButton from "../../../shared/components/IconButton";
import {useNavigation} from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';

function CreateButton() {
    const navigation = useNavigation();

    const goToCreateProduct = () => {
        navigation.navigate('Main', {
            screen: 'ManageProduct',
            params:{

            }
        })
    };

    const goToCreateCategory = () => {
        navigation.navigate("Main", {
            screen: "CreateCategory",
        });
    };

    return (
        <View className="flex py-2 w-full flex-row  gap-2">
            <IconButton
                onPress={goToCreateProduct}
                icon={<AntDesign name="plus" size={15} color="white" />}
                label={"Product"}
            />

            <IconButton
                onPress={goToCreateCategory}
                icon={<AntDesign name="plus" size={15} color="white" />}
                label={"Category"}
            />
        </View>
    );
}

export default CreateButton;