import React, {useEffect} from "react";
import {Pressable, Text, useColorScheme, View} from "react-native";
import {ImageOff} from "lucide-react-native";
import {useImageManager} from "../hooks/useImagePicker";
import {ImagePickerAsset} from "expo-image-picker";
import {Image} from "expo-image";

type ImagePickerProps = {
   value:string,
    onSelectImage: (image: ImagePickerAsset) => void;
    previewBgColor?:string
};

export default function ImagePicker({onSelectImage,value,previewBgColor}:ImagePickerProps) {

    const theme = useColorScheme();
    const { image, pickImage, takePhoto} = useImageManager();

    useEffect(() => {
        if (image) {
            onSelectImage(image);
        }
    }, [image]);
    return (
        <>
            { value ?    <View style={{backgroundColor:previewBgColor ?? ""}}  className="rounded-xl     p-3 flex w-[200px] h-[200px]  justify-center items-center">
                <>

                    <Image style={{width:"100%", height:"100%"}}
                           source={value}
                           contentFit={"contain"}
                    />


                </>
            </View>:
            <View className="flex items-center justify-center px-6">


                <View className=" p-6 bg-blue-50 dark:bg-transparent rounded-full ">

                    <ImageOff size={50} strokeWidth={1.8} color={theme === "dark" ? "#E2E8F0" : "#64748B"}   />
                </View>


                <Text
                    className="text-md  text-slate-500 dark:text-white font-semibold font-jakarta"
                >
                    Start adding photo
                </Text>


                <Text
                    className="text-slate-500 text-xs dark:text-white text-center mb-6 font-jakarta"
                >
                    Add images to continue and organize your product properly.
                </Text>



            </View>

            }
            <View className="flex-row gap-1 w-full place-items justify-center py-2">


                <Pressable
                    onPress={pickImage}
                    className=" bg-blue-500 py-2 px-4  rounded-full justify-center items-center"
                >
                    <Text
                        className="text-white font-jakarta font-bold text-xs"
                    >
                        Gallery
                    </Text>
                </Pressable>


                <Pressable
                    onPress={takePhoto}
                    className=" border py-2 px-4  border-slate-300 dark:border-white justify-centerx rounded-full items-center"
                >
                    <Text
                        className="text-slate-500 dark:text-white font-jakarta font-bold text-xs ">
                        Camera
                    </Text>
                </Pressable>

            </View>
        </>
    );
}