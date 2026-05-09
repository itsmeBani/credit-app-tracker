import React, {useRef, useState} from "react";
import {View} from "react-native";

import {Controller, useForm} from "react-hook-form";
import HeaderNavigation from "../../../../shared/components/HeaderNavigation";
import Input from "../../../../shared/components/Input";
import ColorPicker from "../../../../shared/components/ColorPicker";
import Button from "../../../../shared/components/Button";
import {useNavigation} from "@react-navigation/native";
import ImagePicker from "../../../../shared/components/ImagePicker";
import {useImageManager} from "../../../../shared/hooks/useImagePicker";
import {SafeAreaView} from "react-native-safe-area-context";
import KeyboardAwareContainer from "../../../../shared/components/KeyboardAwareContainer";
import {useCategoryActions} from "../../store/store.category";
import {ManageCategoryFormValues} from "../../types";
import {manageCategorySchema} from "../../schema_validation/category";
import {zodResolver} from "@hookform/resolvers/zod";


function CreateCategoryScreen() {
    const navigation = useNavigation();


    const scrollRef = useRef<any>(null);

    const  {createCategory}=useCategoryActions()

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<ManageCategoryFormValues>({
        resolver: zodResolver(manageCategorySchema),
        defaultValues: {
            name: "",
            description: "",
            imageUrl:"",
            backgroundColor:"",
        },
    });
    const previewColor = watch("backgroundColor");

    const onSubmit = async (data:ManageCategoryFormValues) => {
        createCategory(data)
        reset()
    }


    return (

        <SafeAreaView className="flex-1">
            <HeaderNavigation
                onPress={() => navigation.goBack()}
                description={"Add new category to organize your product"}
                title={"Create New Category"}
            />


            <KeyboardAwareContainer ref={scrollRef}>
                <Controller
                    control={control}
                    name="imageUrl"
                    render={({field: {onChange, value}}) => (
                        <View className="flex items-center mt-4  h-[250px] w-full justify-center">
                                <ImagePicker previewBgColor={previewColor} value={value}  onSelectImage={(image)=>onChange(image.uri)}  />
                        </View>
                    )}
                />

                <View className="flex gap-5 px-5 mt-4">

                  <Controller
                      control={control}
                      name="name"
                      rules={{ required: "Name is required" }}
                      render={({ field: { value, onChange } }) => (
                          <Input
                              label="Category Name"
                              value={value}
                              onChangeText={onChange}
                              error={errors.name?.message}
                          />
                      )}
                  />

                  <Controller
                      control={control}
                      name="description"
                      rules={{ required: "Description is required" }}
                      render={({ field: { value, onChange } }) => (
                          <Input
                              label="Description"
                              value={value}
                              onChangeText={onChange}
                              error={errors.description?.message}
                          />
                      )}
                  />

                    <Controller
                        control={control}
                        name="backgroundColor"
                        rules={{ required: "Name is required" }}
                        render={({ field: { value, onChange } }) => (
                            <ColorPicker label={"Category Color"} onColorChange={(c) => onChange(c)} />

                        )}
                    />

                  <Button   title="Save Category" onPress={handleSubmit(onSubmit)} />

              </View>
            </KeyboardAwareContainer>

             </SafeAreaView>

    );
}

export default CreateCategoryScreen;