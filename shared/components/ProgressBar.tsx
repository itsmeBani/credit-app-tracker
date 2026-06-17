import React from "react";
import { View } from "react-native";
import { ProgressBar as Bar } from "react-native-paper";

type Props = {
    amount: number;
    total: number;
};

const getColor = (percent: number) => {
    if (percent < 20) return "#f87171"; // red-400
    if (percent < 50) return "#fb923c"; // orange-400
    if (percent < 70) return "#fbbf24"; // amber-400
    return "#22c55e"; // green-500
};

function ProgressBar({ amount, total }: Props) {
    const percent = total > 0 ? (amount / total) * 100 : 0;
    const clamped = Math.max(0, Math.min(percent, 100));

    return (
       <View className={"py-2"}>
           <Bar
               progress={clamped / 100} style={{height:6,borderRadius:100}}
               color={getColor(clamped)}
           />
       </View>
    );
}

export default ProgressBar;