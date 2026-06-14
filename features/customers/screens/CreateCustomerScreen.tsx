import React, {useRef} from "react";
import {View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import HeaderNavigation from "../../../shared/components/HeaderNavigation";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import KeyboardAwareContainer from "../../../shared/components/KeyboardAwareContainer";


import {manageCustomerSchema} from "../schema_validation/customer";
import {ManageCustomerFormValues} from "../types";
import {customersService} from "../services/customers.service";
import IconButton from "../../../shared/components/IconButton";


function CreateCustomerScreen() {
    const navigation = useNavigation();
    const scrollRef = useRef<any>(null);


    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ManageCustomerFormValues>({
        resolver: zodResolver(manageCustomerSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
        },
    });

    const onSubmit = async (data: ManageCustomerFormValues) => {
        navigation.goBack();
        await customersService.createCustomer(data);
         reset();

    };

    return (
        <SafeAreaView >
            <HeaderNavigation

                description={"Add a new customer to manage credits"}
                title={"Create New Customer"}
            />

            <KeyboardAwareContainer ref={scrollRef}>
                <View className="flex gap-5 px-5 mt-6">

                    {/* First Name */}
                    <Controller
                        control={control}
                        name="firstname"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                label="First Name"
                                placeholder={"e.g. Bani"}
                                value={value}
                                onChangeText={onChange}
                                error={errors.firstname?.message}
                            />
                        )}
                    />

                    {/* Last Name */}
                    <Controller
                        control={control}
                        name="lastname"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                label="Last Name"
                                placeholder={"e.g. Cruz"}
                                value={value}
                                onChangeText={onChange}
                                error={errors.lastname?.message}
                            />
                        )}
                    />

                    {/* Submit */}
                    <IconButton containerClassName={"py-3"}
                        label="Save Customer"
                        onPress={handleSubmit(onSubmit)}
                    />

                </View>
            </KeyboardAwareContainer>
        </SafeAreaView>
    );
}

export default CreateCustomerScreen;