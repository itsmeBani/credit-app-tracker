import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useColorScheme, Text, Pressable} from "react-native";
import {BottomNavigation, TouchableRipple} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";

export function CustomTabBar({
                                 state,
                                 descriptors,
                                 navigation,
                             }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();
    const isDark = useColorScheme() === 'dark';

    const colors = isDark
        ? {
            background: '#1F1F1F',
            activeTint: '#D6E3FF',
            inactiveTint: '#B5B8B8',
            indicator: '#0F4C75',
        }
        : {
            background: 'white',
            activeTint: '#004A77',
            inactiveTint: '#454746',
            indicator: '#c3e7fe',
        };

    return (
        <BottomNavigation.Bar
            navigationState={state} keyboardHidesNavigationBar={true}

            safeAreaInsets={insets}
            activeColor={colors.activeTint}
            inactiveColor={colors.inactiveTint}
            style={{backgroundColor: colors.background}}
            activeIndicatorStyle={{backgroundColor: colors.indicator}}
            onTabPress={({route, preventDefault}) => {

                const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                });

                if (event.defaultPrevented) {
                    preventDefault();
                    return;
                }

                navigation.dispatch({
                    ...CommonActions.navigate(route.name, route.params),
                    target: state.key,
                });
            }}
            renderIcon={({route, focused, color}) => {
                const options = descriptors[route.key].options;

                return options.tabBarIcon?.({
                    focused,
                    color,
                    size: 22,
                }) ?? null;
            }}


            renderLabel={({route, color, focused}) => {

                const textColor = focused ? (isDark ? "#8ecbee" : "#2596be") : colors.inactiveTint
                return <Text style={{color: textColor}}
                             className={"text-center  text-xs font-semibold font-jakarta"}>{route.name}</Text>
            }}

        />
    );
}
