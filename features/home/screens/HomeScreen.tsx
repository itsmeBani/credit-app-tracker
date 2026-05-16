import React, {useState} from 'react';
import {Pressable, Text, View} from "react-native";
import {NumberFlow} from 'number-flow-react-native';

function HomeScreen() {

    const [price,setPrice]=useState(100)
    return (
        <View className="flex-1 items-center bg-white justify-center ">
            <Text className="text-xl font-bold text-blue-500">
                HOME

            </Text>
            <NumberFlow
                value={price}
                style={{ fontSize: 32, fontFamily: 'PlusJakartaSans', color: '#000' }}
            />
            <Pressable onPress={()=>setPrice((prevState)=>prevState+1000)}>
                <Text>Inc</Text>
            </Pressable>
        </View>
    );
}

export default HomeScreen;