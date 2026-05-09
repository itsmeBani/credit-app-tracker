import React from 'react';
import {Text, TouchableOpacity, useColorScheme, View} from "react-native";

import {useTheme} from "@react-navigation/native";
import { Image } from 'expo-image';
import ModelProducts from "../../../../local_database/model/model.products";

interface ProductCardProps {
    data:ModelProducts,
    onPress:()=>void

}
function ProductCard({data,onPress}:ProductCardProps) {

    const { colors } = useTheme();
    const theme=useColorScheme()


    return (
      <TouchableOpacity onPress={onPress} activeOpacity={1}   style={{backgroundColor:colors.card}}  className="flex-1 p-3 h-[220px] shadow  rounded-lg ">
         <View className="flex-1">


             <Image cachePolicy={"memory-disk"}
                 source={data?.imageUrl as string}
                  contentPosition={"center"}
                    contentFit={"contain"}
                 className="w-full h-full" style={{flex:1}}
             />

         </View>

      <View className="flex flex-row justify-between">
       <View>
           <Text numberOfLines={1} style={{color:colors.text,opacity:0.7, fontFamily:"PlusJakartaSans"}} className={" font-bold text-sm leading-2"}>{data?.name}</Text>
           { data?.description  && <Text numberOfLines={1} style={{color:colors.text, fontFamily:"PlusJakartaSans"}} className={" font-normal text-xs leading-2"}>{data?.description}</Text>}
           <Text style={{color:theme === "dark" ? colors.text :colors.primary, fontFamily:"PlusJakartaSans"}} className={"font-bold  mt-1  text-xl"}>₱{data.price}</Text>


       </View>

      </View>
      </TouchableOpacity>
    );
}

export default ProductCard;