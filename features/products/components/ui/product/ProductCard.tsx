import React from 'react';
import {Text, TouchableOpacity, useColorScheme, View} from "react-native";

import {useTheme} from "@react-navigation/native";
import { Image } from 'expo-image';
import ModelProducts from "../../../../../local_database/model/model.products";

interface ProductCardProps {
    data:ModelProducts,
    onPress:()=>void
    variant?: "GRID" | "ROW";
    priceAtPurchase?:number,
    children?: React.ReactNode;
    isSelected?:boolean
}
function ProductCard({data,onPress,variant="GRID",children,isSelected,priceAtPurchase}:ProductCardProps) {


    const { colors } = useTheme();
    const theme=useColorScheme()


    const BaseContainerStyle=variant === "ROW" ? "flex flex-row  shadow-md bg-white  items-center justify-between " :"flex flex-row  items-center justify-between flex-1  p-3 h-[220px]   shadow  rounded-lg"

    const isProductSelectedStyle=isSelected ? "" : ""

    const subContainerStyle= variant === "ROW" ? "flex   rounded-lg flex-row items-center gap-4 " : "flex-1  rounded-lg flex-col  gap-4 "
    const imageContainerStyle= variant === "ROW" ? "aspect-square h-[60px]" : "flex-1"

    return (
      <TouchableOpacity style={{backgroundColor:colors.card}} onPress={onPress} activeOpacity={1} className={`${BaseContainerStyle} ${isProductSelectedStyle} rounded-lg p-3`}   >
     <View className={subContainerStyle}>
         <View className={imageContainerStyle}>


             <Image cachePolicy={"memory-disk"}
                    source={data?.imageUrl as string}
                    contentPosition={"center"}
                    contentFit={"contain"}
                    className="w-full h-full" style={{flex:1}}
             />

         </View>
         <View className="">
             <View>
                 <Text numberOfLines={1} style={{color:colors.text,opacity:0.7, fontFamily:"PlusJakartaSans"}} className={" font-bold text-sm leading-2"}>{data?.name}</Text>
                 { data?.description  && <Text numberOfLines={1} style={{color:colors.text, fontFamily:"PlusJakartaSans"}} className={" font-normal text-xs leading-2"}>{data?.description}</Text>}
                 <Text style={{color:theme === "dark" ? colors.text :colors.primary, fontFamily:"PlusJakartaSans"}} className={"font-bold  mt-1  text-xl"}>₱{priceAtPurchase ?? data.price}</Text>


             </View>

         </View>
     </View>
          {children}
      </TouchableOpacity>
    );
}

export default ProductCard;








