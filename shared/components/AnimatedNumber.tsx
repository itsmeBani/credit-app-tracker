import React, { useState } from "react";
import { View, ViewStyle } from "react-native";
import { Canvas, Group } from "@shopify/react-native-skia";
import { SkiaNumberFlow, useSkiaFont } from "number-flow-react-native/skia";

type Props = {
    value: number;
    height?: number;
    fontSize?: number;
    marginTop?: number;
    color?: string;
    currency?: string;
    locale?: string;
    align?: "left" | "center" | "right";
    style?: ViewStyle;
    format?: Intl.NumberFormatOptionsStyle
};

function AnimatedNumber({
                            value,
                            height = 80,
                            fontSize = 48,
                            color = "#000",
                            currency = "PHP",
                             format="currency",
                            locale = "en-PH",
                            align = "left",
                            marginTop = 4,
                            style,
                        }: Props) {
    const [layoutWidth, setLayoutWidth] = useState(0);

    const font = useSkiaFont(
        require("../../assets/fonts/number.ttf"),
        fontSize
    );

    if (!font) {
        return <View style={{ height }} />;
    }

    const text = value.toLocaleString(locale, {
        style: "currency",
        currency,
    });

    const textWidth = font.measureText(text).width;

    let x = 0;

    if (align === "center") {
        x = (layoutWidth - textWidth) / 2;
    } else if (align === "right") {
        x = layoutWidth - textWidth;
    } else {
        x = 0;
    }

    return (
        <View
            style={[{ width: "100%", height, marginTop }, style]}
            onLayout={(e) => setLayoutWidth(e.nativeEvent.layout.width)}
        >
            <Canvas style={{ flex: 1 }}>
                <Group
                    transform={[
                        { translateX: x },
                        { translateY: height / 1.3},
                    ]}
                >
                    <SkiaNumberFlow
                        value={value}
                        font={font}
                        color={color}
                        x={0}
                        y={0}
                        trend={0}
                        format={{
                            style:format ,
                            currency,
                            currencyDisplay: "symbol",
                        }}
                    />
                </Group>
            </Canvas>
        </View>
    );
}

export default AnimatedNumber;