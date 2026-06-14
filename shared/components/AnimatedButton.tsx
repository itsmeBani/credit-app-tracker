import React, {useRef, useState} from 'react';
import {Pressable, Text, View} from "react-native";
import LottieView from "lottie-react-native";
import {useTheme} from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import {CheckIcon} from "lucide-react-native";

function AnimatedButton() {
    const animationRef = useRef<LottieView>(null);
    const { colors } = useTheme();

    const [isSuccess,setIsSuccess]=useState(false)
    const [loading,setLoading]=useState(false)

    const handleSubmit=async ()=>{
        console.log("submit")
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSuccess(true)
        setLoading(false)
        animationRef.current?.play();

    }
    const onFinishAnimation=()=>{
        animationRef.current?.pause()

        setIsSuccess(false)
    }


    return (


            <Pressable
                onPress={handleSubmit}
                style={{zIndex:1, position:"relative",backgroundColor:isSuccess ? "#22C55E" :colors.primary}}
               className="py-3 min-w-[100px] z-1 px-6 relative  items-center justify-center  w-full  rounded-full   "

            >


                {loading ? <Feather name="loader" size={20} color="white" className={"animate-spin"}/>

                   : (
                        isSuccess ?  <CheckIcon strokeWidth={4} color={"white"}/> :
                            <Text className="font-bold text-white font-jakarta">Submit</Text>

                    )
                }


            </Pressable>

    );
}

export default AnimatedButton;