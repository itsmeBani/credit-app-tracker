import React, {forwardRef, useImperativeHandle, useRef, useState,} from "react";
import {Text, View} from "react-native";
import BottomSheet, {BottomSheetBackdrop, BottomSheetView,} from "@gorhom/bottom-sheet";
import {useTheme} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ShoppingBag} from "lucide-react-native";

import IconButton from "../../../../shared/components/IconButton";
import Title from "../../../../shared/components/Title";
import Search from "../../../../shared/components/Search";

import {useFetchProducts} from "../../../products/hook/useFetchProducts";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {ProductCardSelect} from "../../../products/components/ui/product/product";
import {FlashList} from "@shopify/flash-list";
import {useCreateItemsCredit} from "../../hook/useCreateItemsCredit";
import {NumberFlow} from "number-flow-react-native";
import {
    useItemSelectionActions,
    useItemSelectionCount,
    useItemSelectionState,
    useItemSelectionTotal
} from "../store/itemSelectionStore";
import AnimatedNumber from "../../../../shared/components/AnimatedNumber";

export type CreateItemCreditModalRef = {
    open: () => void;
    close: () => void;
};

type CreateItemCreditModalProps = {
    creditId: string;
    ref: React.RefObject<CreateItemCreditModalRef | null>
};


function CreateItemCreditModal({creditId, ref}: CreateItemCreditModalProps) {


    const {colors} = useTheme();
    const insets = useSafeAreaInsets();


    const bottomSheetRef = useRef<BottomSheet>(null);

    const {createItemsCredit, loading} = useCreateItemsCredit()

    const [search, setSearch] = useState("");

    const {products} = useFetchProducts(search)


    const selectedItem = useItemSelectionState()
    const {toggleItem, isSelected, clearItem} = useItemSelectionActions()
    const totalItems = useItemSelectionTotal()
    const itemCounts = useItemSelectionCount()


    useImperativeHandle(ref, () => ({
        open: () => bottomSheetRef.current?.expand(),
        close: () => bottomSheetRef.current?.close(),
    }));

    const HandleCreate = async () => {
        if (itemCounts <= 0) return;

        await createItemsCredit(
            creditId,
            selectedItem
        );
        clearItem()
        closeModal()
    }

    const closeModal = () => {
        bottomSheetRef.current?.close()
    }


    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={["100%"]}
            containerStyle={{zIndex: 1000}}
            enablePanDownToClose
            enableHandlePanningGesture={false}
            enableOverDrag={false}
            enableContentPanningGesture={false}

            backgroundStyle={{
                backgroundColor: colors.card,
                borderRadius: 20,
            }}
            handleIndicatorStyle={{
                backgroundColor: colors.background,
                padding: 0,
                position: "absolute"
            }}


        >
            <BottomSheetView className={"flex-1 "}
                             style={{height: "100%", paddingBottom: insets.bottom, paddingTop: insets.top - 10}}>

                <View className="px-4 1">
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

                <View className="flex-1  ">
                    <FlashList data={products}
                               keyExtractor={(item) => item.id}
                               extraData={selectedItem}
                               ItemSeparatorComponent={() => <View style={{height: 8}}/>}
                               contentContainerStyle={{
                                   paddingBottom: 10,
                                   paddingHorizontal: 12,
                                   paddingTop: 10,
                                   gap: 10,
                               }}
                               showsVerticalScrollIndicator={false}
                               renderItem={({item}) => {
                                   const isSelect = isSelected(item.id);
                                   return (
                                       <ProductCardSelect id={item?.id} isSelected={isSelect}
                                                          name={item.name}
                                                          onPress={() => toggleItem(item)}
                                                          description={item.description ?? ""}
                                                          image={item.imageUrl}
                                                          price={item.price}
                                       />
                                   );
                               }}
                    />

                </View>
                <View className="gap-2 px-5"
                      style={{
                          paddingTop: 10,
                          paddingBottom: 10,
                          backgroundColor: colors.card,
                          borderTopWidth: 1,
                          borderTopColor: colors.border,
                      }}
                >
                    <View className={"flex  flex-row gap-2  py-2"}>
                        <View className="flex-1   flex-row gap-3">
                            <View className="items-center justify-center">
                                <View className="bg-blue-500/20  p-2 rounded-md">
                                    <ShoppingBag size={18} color={colors.primary}/>
                                </View>
                            </View>
                            <View className="flex-1 flex-row ">

                                <View className="flex-1">
                                    <Text
                                        className="font-jakarta text-xs dark:text-gray-200 text-slate-500 font-medium">
                                        Total
                                    </Text>
                                    <AnimatedNumber marginTop={0} height={28} fontSize={20} value={totalItems}
                                                    color={colors.primary}/>

                                </View>
                            </View>
                        </View>

                        <View className=" flex-row  items-center gap-4">


                            <View>

                                <Text
                                    className="font-jakarta text-xs font-medium text-slate-600  bg-gray-100 dark:bg-gray-100/10 px-3 font-semibold py-1 rounded-full dark:text-gray-200   ">{itemCounts}X</Text>

                            </View>
                        </View>


                    </View>
                    <IconButton
                        label="Add to Credit"
                        disabled={loading}
                        icon={<MaterialCommunityIcons
                            name={"package-variant-closed"}
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
            </BottomSheetView>
        </BottomSheet>
    );
}


export default CreateItemCreditModal;