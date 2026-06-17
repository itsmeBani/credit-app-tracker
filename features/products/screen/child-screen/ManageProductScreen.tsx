import {ManageProductFormValues, ManageProductRouteProps} from "../../types";
import {useProductActions, useProductDetails} from "../../store/store.products";
import React, {Suspense, useEffect, useRef, useState} from "react";
import {useCurrencyFormatter} from "../../../../shared/hooks/useCurrencyFormatter";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {manageProductSchema} from "../../schema_validation/products";
import {SafeAreaView} from "react-native-safe-area-context";
import HeaderNavigation from "../../../../shared/components/HeaderNavigation";
import KeyboardAwareContainer from "../../../../shared/components/KeyboardAwareContainer";
import {FlatList, Text, View} from "react-native";
import Input from "../../../../shared/components/Input";
import Button from "../../../../shared/components/Button";
import {KeyboardProvider} from "react-native-keyboard-controller";
import ImagePicker from "../../../../shared/components/ImagePicker";
import ProductAvailabilityToggle from "../../components/ui/product/ProductAvailabilityToggle";
import ModelProductCategory from "../../../../local_database/model/model.productCategory";
import CategoryCard from "../../components/ui/category/CategoryCard";
import {ProductCategoryRepository} from "../../data/category.repository";
import {productService} from "../../services/product.service";

import {SafeAreaContainer} from "../../../../shared/components/SafeLayoutContainer";
import {useNavigation} from "@react-navigation/native";

export default function ManageProductScreen({route}: ManageProductRouteProps) {
    const {productId} = route.params
  const navigation=useNavigation()

    const isEditMode = !!productId;

    const {
        getProductById,


    } = useProductActions();

    const selectedProduct = useProductDetails();

    const scrollRef = useRef<any>(null);

    const {handlePriceChange, formatNumber} = useCurrencyFormatter();


    const [categories,setCategories]=useState<ModelProductCategory[]|null>(null)

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting}
    } = useForm<ManageProductFormValues>({
        resolver: zodResolver(manageProductSchema),
        defaultValues: {
            name: "",
            price: "",
            description: "",
            imageUrl:"",
            status: "AVAILABLE",
            categoryId: "",
        },
    });



    useEffect(() => {
        if (isEditMode) {
            getProductById(productId);
        }
    }, [productId,isEditMode,reset]);


    useEffect(() => {
        if (isEditMode && selectedProduct) {
            reset({
                name: selectedProduct.name,
                price: selectedProduct.price,
                description: selectedProduct.description ?? "",
                imageUrl: selectedProduct?.imageUrl,
                status: selectedProduct?.status,
                categoryId: selectedProduct?.categoryId,
            });
        }
    }, [selectedProduct]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const productCategoryRepository=new ProductCategoryRepository()

                const data = await productCategoryRepository.getProductCategories();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadCategories();
    }, []);


    const onSubmit = async (data: ManageProductFormValues) => {




            if (isEditMode && selectedProduct?.id) {
                await productService.updateProduct(selectedProduct.id, data);

            } else {
               await productService.createProduct(data);
                 // reset();
            }

        // navigation.goBack()
    }


    return (
        <SafeAreaContainer className="flex-1">
            <HeaderNavigation

                title={isEditMode ? "Edit Product" : "Create Product"}
                description={
                    isEditMode
                        ? "Update your product information"
                        : "Enter all required product details"
                }
            />

            <KeyboardAwareContainer ref={scrollRef}>

                <Controller
                    control={control}
                    name="imageUrl"
                    render={({field: {onChange, value}}) => (
                        <View className="flex items-center  h-[250px] w-full justify-center   ">
                             <ImagePicker value={value}   onSelectImage={(image)=>onChange(image.uri)}  />
                        </View>
                    )}
                />

                <View className="flex gap-3 pb-10  px-2 mt-4">


                    <Controller
                        control={control}
                        name="name"
                        render={({field: {onChange, value}}) => (
                            <Input
                                label="Product Name"
                                value={value}
                                placeholder="e.g. LPG"
                                onChangeText={onChange}
                                error={errors.name?.message}
                                onFocus={(e: any) =>
                                    scrollRef.current?.scrollToFocusedInput?.(e.target)
                                }
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="price"
                        render={({field: {onChange, value}}) => (
                            <Input
                                label="Price"
                                value={value ? formatNumber(value) : ""}
                                onChangeText={handlePriceChange(onChange)}
                                inputMode="numeric"
                                keyboardType="name-phone-pad"
                                disableKeyboardShortcuts
                                error={errors.price?.message}
                                placeholder="e.g. 99.99"
                                onFocus={(e) =>
                                    scrollRef.current?.scrollToFocusedInput?.(e.target)
                                }
                            />
                        )}
                    />


                    <Controller
                        control={control}
                        name="description"
                        render={({field: {onChange, value}}) => (
                            <Input
                                label="Description (Optional)"
                                placeholder="Tell us more about this item"
                                value={value ?? ""}
                                onChangeText={onChange}
                                error={errors.description?.message}
                                onFocus={(e) =>
                                    scrollRef.current?.scrollToFocusedInput?.(e.target)
                                }
                            />
                        )}
                    />
                    {isEditMode && (
                        <Controller
                            control={control}
                            name="status"
                            render={({ field: { onChange, value } }) => (
                               <ProductAvailabilityToggle value={value} onChange={onChange} />
                            )}
                        />
                    )}

                    <Controller
                        control={control}
                        name="categoryId"
                        render={({field: {onChange, value}}) => (
                           <>

                               <Text
                                   style={{ fontFamily: "PlusJakartaSans" }}
                                   className=" text-gray-600 text-sm dark:text-white"
                               >
                                   Categories
                               </Text>
                               <FlatList
                                   data={categories}
                                   extraData={categories}
                                   keyExtractor={(item) => item.id.toString()}
                                   horizontal
                                   overScrollMode={"never"}
                                   showsHorizontalScrollIndicator={false}
                                   contentContainerStyle={{gap:13 }}
                                   renderItem={({ item }) => {

                                       return (
                                           <CategoryCard
                                               item={item}
                                               isActive={value === item.id}
                                               onPress={()=>onChange(item.id)}
                                           />
                                       );
                                   }}
                               />

                               {errors.categoryId?.message &&
                                   <Text
                                   style={{ color: "#fd4949" }}
                                   className="font-jakarta text-xs mt-1">{errors.categoryId?.message}</Text>}
                           </>
                        )}
                    />



                </View>

            </KeyboardAwareContainer>
            <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting} label={isSubmitting
                ? "Saving..."
                : isEditMode
                    ? "Update Product"
                    : "Create Product"} containerClassName={"py-4"}
            />
        </SafeAreaContainer>
    );
}


