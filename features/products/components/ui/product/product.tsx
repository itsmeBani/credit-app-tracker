import {Pressable, Text, useColorScheme, View} from "react-native";
import {Minus, Plus} from "lucide-react-native";
import {Image} from "expo-image";
import React from "react";
import {formatAmount} from "../../../../../shared/utils/formatAmount";
import {useTheme} from "@react-navigation/native";
import {ProductCardActionProps, ProductCardProps, ProductCardSelectProps} from "./types";
import {useItemSelectionActions} from "../../../../customers_credit/credit_items/store/itemSelectionStore";


const baseStyle = " p-2 flex-1 border flex flex-row justify-between border-slate-500/10 rounded-md"

export const ProductCardSelect = ({onPress, image, name, description,isSelected, price,id}: ProductCardSelectProps) => {

    return (
        <Pressable onPress={onPress}
                   className={`h-[90px] p-2 flex-1 border flex flex-row justify-between ${isSelected ? "border-blue-500/60 bg-blue-200/10" : "border-slate-500/10"}  rounded-lg `}>
            <View className="flex-1 gap-3 flex-row">
                <View className="aspect-square rounded-lg ">
                    <Image cachePolicy={"memory-disk"}
                           source={image}
                           contentPosition={"center"}
                           contentFit={"contain"}
                           className="w-full h-full" style={{flex: 1}}
                    />
                </View>
                <View className="justify-center">
                    <Text
                        className="font-jakarta dark:text-gray-200 text-slate-500 leading-6 font-bold text-lg">{name}</Text>
                    <Text
                        className="font-jakarta dark:text-gray-200 leading-4 text-slate-500 font-normal text-xs">{description}</Text>
                    <Text
                        className={`font-jakarta   dark:text-gray-200 font-bold text-[13px] ${isSelected ? "text-blue-500" : "text-slate-600"}`}>{formatAmount(price)}</Text>
                </View>

            </View>
            <View className="justify-center pr-3">
                <View
                    className={`w-6 h-6 items-center justify-center border-2 rounded-full ${
                        isSelected
                            ? "border-blue-500"
                            : "border-slate-400/40"
                    }`}
                >
                    {isSelected && (
                        <View className="w-[12px] h-[12px] rounded-full bg-blue-500"/>
                    )}
                </View>
            </View>
        </Pressable>
    )
}

export const ProductCard = ({image,price,name,description, onPress,horizontal=false}:ProductCardProps) => {

    const { colors } = useTheme();
    const theme=useColorScheme()

  const baseStyle=horizontal ? "flex-row":"flex-col"

    const imageStyle=horizontal ? 50 : "auto"
    return (
        <Pressable onPress={onPress} style={{backgroundColor:colors.card,height:horizontal ? 90 : "auto"}}  className="flex flex-row  items-center justify-between flex-1  p-3    shadow-sm  rounded-lg">

            <View className={`flex-1  rounded-lg flex-row  gap-4 ${baseStyle}`}>
                <View  style={{width:imageStyle,height:imageStyle}}  className=" aspect-square">


                    <Image cachePolicy={"memory-disk"}
                           source={image}
                           contentPosition={"center"}
                           contentFit={"contain"}
                           className="w-full h-full" style={{flex:1}}
                    />

                </View>
                <View className="flex-1 ">
                    <View className={"justify-center"}>
                        <Text numberOfLines={1} style={{color:colors.text,opacity:0.7, fontFamily:"PlusJakartaSans"}} className={" font-bold text-sm leading-2"}>{name}</Text>
                        { description  && <Text numberOfLines={1} style={{color:colors.text, fontFamily:"PlusJakartaSans"}} className={" font-normal text-xs leading-2"}>{description}</Text>}
                        <Text style={{color:theme === "dark" ? colors.text :colors.primary, fontFamily:"PlusJakartaSans"}} className={"font-bold  mt-1  text-md"}>{formatAmount(price)}</Text>


                    </View>

                </View>

            </View>
        </Pressable>
    )
}

export const ProductCardAction = ({onPress, image, name, description, price,decrementQuantity,incrementQuantity,quantity,subTotal}: ProductCardActionProps) => {
    const {colors} = useTheme();


    return (
        <View style={{backgroundColor:colors.card}} className={baseStyle} >


            <View className="flex-1 gap-4 py-2 flex-row">
                <View className="aspect-square rounded-lg ">
                    <Image cachePolicy={"memory-disk"}
                           source={image}
                           contentPosition={"center"}
                           contentFit={"contain"}
                           className="w-full h-full" style={{flex: 1}}
                    />
                </View>
                <View className="justify-center">
                    <Text
                        className="font-jakarta dark:text-gray-200 text-slate-600 leading-6 font-bold text-md">{name}</Text>
                    <Text
                        className="font-jakarta dark:text-gray-200 leading-4 text-slate-500 font-normal text-xs">{description}</Text>
                    <Text
                        className={`font-jakarta   dark:text-gray-200  text-[10px] text-slate-600 `}>{formatAmount(price)}</Text>

                    <View className="flex flex-row pt-3 pr-3">
                        <Pressable onPress={decrementQuantity} className={"h-7 w-7 rounded-md items-center justify-center dark:bg-gray-100/10  bg-gray-200/60 "}>
                            <Minus color={colors.primary} strokeWidth={3} size={16}/>
                        </Pressable>
                        <View className={"h-7 px-3 bg--500 items-center justify-center "}>
                            <Text className="font-bold font-jakarta text-slate-600 leading-4  dark:text-white  ">{quantity}</Text>
                        </View>
                        <Pressable onPress={incrementQuantity} className={"h-7  w-7 rounded-md  items-center justify-center bg-blue-600 "}>
                            <Plus color={"white"} strokeWidth={3} size={16}/>
                        </Pressable>
                    </View>
                </View>

            </View>
            <View className="pr-3 pt-3 items-end">

                <Text className="font-jakarta text-blue-600 dark:text-white font-extrabold text-lg">{formatAmount(subTotal)}</Text>
                <Text className="font-jakarta text-xs font-medium text-slate-600  bg-gray-100 dark:bg-gray-100/10 px-3 font-semibold py-1 rounded-full dark:text-gray-200   ">{quantity}X</Text>
            </View>

        </View>
    )
}
