import React, {forwardRef, useImperativeHandle, useRef, useState,} from "react";
import {Text, View} from "react-native";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetFooter,
    BottomSheetFooterProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import {useTheme} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ShoppingBag} from "lucide-react-native";

import IconButton from "../../../shared/components/IconButton";
import Title from "../../../shared/components/Title";
import Search from "../../../shared/components/Search";
import ModelProducts from "../../../local_database/model/model.products";

import {useFetchProducts} from "../hook/useFetchProducts";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {formatAmount} from "../../../shared/utils/formatAmount";
import {ProductCardSelect} from "../../products/components/ui/product/product";
import {FlashList} from "@shopify/flash-list";
import CreditsRepository from "../data/credits.repository";
import {CreditsService} from "../services/credits.service";

export type CreateItemCreditModalRef = {
    open: () => void;
    close: () => void;
};

type Props = {
    creditId: string;
};

const CreateItemCreditModal = forwardRef<
    CreateItemCreditModalRef,
    Props
>(({creditId}, ref) => {
    const {colors} = useTheme();
    const insets = useSafeAreaInsets();

    const creditsRepository = new CreditsRepository()
    const creditsService = new CreditsService(creditsRepository)


    const bottomSheetRef = useRef<BottomSheet>(null);


    const [search, setSearch] = useState("");


    const {products} = useFetchProducts(search)


    const [productSelected, setProductSelected] = useState<
        ModelProducts[]
    >([]);


    const toggleProduct = (product: ModelProducts) => {
        setProductSelected((prev) => {
            const exists = prev.some((p) => p.id === product.id);

            if (exists) {
                return prev.filter((p) => p.id !== product.id);
            }

            return [...prev, product];
        });
    };


    useImperativeHandle(ref, () => ({
        open: () => bottomSheetRef.current?.expand(),
        close: () => bottomSheetRef.current?.close(),
    }));

    const HandleCreate = async () => {
        await creditsService.createCreditItems(
            creditId,
            productSelected
        );
        setProductSelected([]);
        // bottomSheetRef.current?.close()
    }

    const closeModal = () => {
        bottomSheetRef.current?.close()
    }

    const totalPrice = productSelected.reduce(
        (sum, item) => sum + Number(item.price),
        0
    );
    const renderFooter = (props: BottomSheetFooterProps) => (
        <BottomSheetFooter {...props}>


            <View
                className="gap-2 px-5"
                style={{
                    paddingTop: 10,
                    paddingBottom: insets.bottom + 30,
                    backgroundColor: colors.card,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                }}
            >
                <View className={"flex  flex-row justify-between py-2"}>

                   <View className="flex flex-row items-center gap-4">
                       <View className="bg-blue-500/20 p-2 rounded-md">
                           <ShoppingBag size={18} color={colors.primary}  />
                       </View>
                    <View>
                        <Text className="font-jakarta dark:text-gray-200 leading-4 text-slate-700 text-xs">
                            {productSelected.length} item selected
                        </Text>
                        <Text className="font-jakarta leading-6 dark:text-gray-200 text-slate-500 font-bold">
                            Total
                        </Text>
                    </View>
                   </View>
                    <Text style={{color: colors.primary}} className={"font-jakarta  text-2xl font-bold"}>
                        {formatAmount(totalPrice)}

                    </Text>
                </View>
                <IconButton
                    label="Add to Credit"
                    icon={<MaterialCommunityIcons name={"package-variant-closed"}
                                                  color={"white"} size={20}/>}
                    onPress={HandleCreate}
                    containerClassName="py-[10px]"
                />

                <IconButton
                    onPress={closeModal}
                    label="Close"
                    variant="outline"
                    containerClassName="py-[10px]"
                />
            </View>
        </BottomSheetFooter>
    );

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={["95%"]}
            enablePanDownToClose
            enableHandlePanningGesture={false}
            enableOverDrag={false}
            enableContentPanningGesture={false}
            footerComponent={renderFooter}

            backgroundStyle={{
                backgroundColor: colors.card,
                borderRadius: 20,
            }}
            handleIndicatorStyle={{
                backgroundColor: colors.background,
                padding: 0,
                position: "absolute"
            }}


            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.5}
                />
            )}
        >
   <BottomSheetView>

    <View className="px-4">
        <Title
            title="Products"
            align="left"
            description="Add product to customer credit"
        />

        <Search
            value={search}
            onChangeText={setSearch}
        />
    </View>

    <FlashList data={products}
               keyExtractor={(item) => item.id}
               ItemSeparatorComponent={() => <View style={{height: 8}}/>}

               contentContainerStyle={{

                   paddingBottom: insets.bottom + 140,
                   paddingHorizontal: 12,
                   paddingTop: 10,
                   gap: 10,
               }}
               showsVerticalScrollIndicator={false}
               renderItem={({item}) => {
                   const isSelected = productSelected.some(
                       (p) => p.id === item.id
                   );

                   return (

                       <ProductCardSelect isSelected={isSelected}
                                          name={item.name}
                                          onPress={() => toggleProduct(item)}
                                          description={item.description ?? ""}
                                          image={item.imageUrl}
                                          price={item.price}
                       />
                   );
               }}
    />
</BottomSheetView>
        </BottomSheet>
    );
});

export default CreateItemCreditModal;