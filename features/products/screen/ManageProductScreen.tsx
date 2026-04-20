import React, { Suspense, useRef } from 'react';
import Title from "../../../shared/components/Title";
import { ManageProductRouteProps } from "../types";
import { Text, View } from "react-native";

import {
    KeyboardAwareScrollView,
    KeyboardProvider
} from 'react-native-keyboard-controller';
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../shared/components/Button";


function ManageProductContent({ route }: ManageProductRouteProps) {
    const { productId } = route.params;

    // const { data } = useSuspenseQuery(fetchProductById(productId));
    //
    //
    // const scrollRef = useRef<any>(null);



    return (
        <View>


        </View>
        // <SafeAreaView className="flex-1 pb-10">
        //
        //     <View className="py-3">
        //         <Title title={"Edit Product"} align={"center"} />
        //     </View>
        //
        //     <KeyboardAwareScrollView
        //         ref={scrollRef}
        //         automaticallyAdjustsScrollIndicatorInsets={true}
        //         keyboardShouldPersistTaps="handled"
        //         contentContainerStyle={{
        //             flexGrow: 1,
        //         }}
        //         showsVerticalScrollIndicator={false}
        //         bottomOffset={80}
        //     >
        //         <View className="w-full h-[300px]">
        //             <Image
        //                 cachePolicy="memory-disk"
        //                 source={data.imageUrls[0] as string}
        //                 contentPosition="center"
        //                 contentFit="contain"
        //                 className="w-full h-full"
        //                 style={{ flex: 1 }}
        //             />
        //         </View>
        //
        //         <View className="flex gap-4 px-5 ">
        //
        //             <Input
        //                 label="Product Name"
        //                 value={"Premium"}
        //                 onChangeText={() => {}}
        //                 onFocus={(e: any) => {
        //                     scrollRef.current?.scrollToFocusedInput?.(e.target);
        //                 }}
        //             />
        //
        //             <Input
        //                 label="Price"
        //                 value={9}
        //                 onChangeText={() => {}}
        //                 isNumeric
        //                 onFocus={(e: any) => {
        //                     scrollRef.current?.scrollToFocusedInput?.(e.target);
        //                 }}
        //             />
        //
        //             <Input
        //                 label="Description (Optional)"
        //                 value={"COKE 8oz"}
        //                 onChangeText={() => {}}
        //                 onFocus={(e: any) => {
        //                     scrollRef.current?.scrollToFocusedInput?.(e.target);
        //                 }}
        //             />
        //
        //
        //             <Button title={"Save"}/>
        //         </View>
        //
        //     </KeyboardAwareScrollView>
        //
        // </SafeAreaView>
    );
}

export default function ManageProductScreen(props: ManageProductRouteProps) {
    return (
        <Suspense fallback={<Text>Loading product...</Text>}>
            <KeyboardProvider>
                <ManageProductContent {...props} />
            </KeyboardProvider>
        </Suspense>
    );
}