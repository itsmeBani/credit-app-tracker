import React from "react";
import {Pressable, View} from "react-native";
import CustomerCard from "./ui/CustomerCard";
import {useNavigation} from "@react-navigation/native";
import {withObservables} from "@nozbe/watermelondb/react";

import {CustomersProps} from "../types";
import {FlashList} from "@shopify/flash-list";

import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import Reanimated, {Extrapolation, interpolate, SharedValue, useAnimatedStyle,} from "react-native-reanimated";

import {UserPen} from "lucide-react-native";
import {customersRepository} from "../services/customers.service";

function RightAction(
    drag: SharedValue<number>
) {
    const animatedStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            drag.value,
            [-100, 0],
            [0, 0],
            Extrapolation.CLAMP
        );

        const scale = interpolate(
            drag.value,
            [-100, 0],
            [1, 0.7],
            Extrapolation.CLAMP
        );

        const opacity = interpolate(
            drag.value,
            [-100, 0],
            [1, 0],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { translateX },
                { scale },
            ],
            opacity,
        };
    });

    return (
        <Reanimated.View
            style={animatedStyle}
            className="mr-2"
        >
            <Pressable
                className="w-[70px] flex-1 items-center justify-center  "
            >
                <UserPen  />
            </Pressable>
        </Reanimated.View>
    );
}

function Customers({ customers }: CustomersProps) {
    const navigation = useNavigation();

    const navigateCustomerCreditScreen = (
        id: string,
        lastname: string,
        firstname: string
    ) => {
        navigation.navigate("Authenticated", {
           screen : "Customers",
            params:{
                screen: "CustomerCredit",
                params: {
                    id,
                    lastname,
                    firstname,
                },
            }
        });
    };

    return (
        <View className="flex-1">
            <FlashList
                data={customers}

                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 7 }} />
                )}
                contentContainerStyle={{
                    paddingBottom: 20,
                }}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    // <ReanimatedSwipeable
                    //     friction={1.5}
                    //     overshootRight={false}
                    //     rightThreshold={40}
                    //     renderRightActions={RightAction}
                    //     containerStyle={{
                    //         overflow: "hidden",
                    //     }}
                    // >
                        <CustomerCard
                            data={item}
                            onClick={() =>
                                navigateCustomerCreditScreen(
                                    item.id,
                                    item.lastname,
                                    item?.firstname
                                )
                            }
                        />
                    // </ReanimatedSwipeable>
                )}
            />
        </View>
    );
}


const enhance = withObservables(
    ["search"],
    ({ search }: { search: string }) => ({
        customers: customersRepository.getObservedCustomers(search),
    })
);

export default enhance(Customers);