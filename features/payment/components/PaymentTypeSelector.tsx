import React, {use, useEffect, useRef} from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import PaymentTypeOption, { PaymentType } from "./ui/PaymentTypeOption";

type PaymentTypeSelectorProps = {
    value: PaymentType;
    onChange: (value: PaymentType) => void;
};

export default function PaymentTypeSelector({
                                                value,
                                                onChange,
                                            }: PaymentTypeSelectorProps) {
    const fullAnimRef = useRef<LottieView>(null);


const handleFullPayment = () => {
    onChange("FULL")
    fullAnimRef.current?.play()
}



    return (
        <View className="flex-row gap-2">
            <View    style={{position:"relative"}}
                    className="relative flex-1">
                <PaymentTypeOption
                    option="FULL"
                    active={value === "FULL"}
                    onPress={handleFullPayment}
                    colors={{
                        bg: "bg-green-50",
                        dot: "bg-green-500",
                        border: "border-green-500",
                        text: "text-green-500",
                    }}
                />

               <View className={"absolute"} style={{zIndex:1,width:"120%",height:"130%"}} pointerEvents={"none"}>
                   <LottieView
                       ref={fullAnimRef}
                       loop={false} autoPlay={true}
                       onAnimationFinish={()=>  fullAnimRef.current?.pause()}
                       resizeMode={"cover"}
                       speed={1.5}

                       source={require("../../../assets/lottie/splash.json")}
                       style={{
                           height: "100%",
                           width: "100%",


                       }}
                   />
               </View>
            </View>

            <PaymentTypeOption
                option="PARTIAL"
                active={value === "PARTIAL"}
                onPress={() => onChange("PARTIAL")}
                colors={{
                    bg: "bg-blue-50",
                    dot: "bg-blue-500",
                    border: "border-blue-500",
                    text: "text-blue-500",
                }}
            />
        </View>
    );
}