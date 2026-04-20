import {DarkTheme, DefaultTheme} from "@react-navigation/native";

export const LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#f8fafc",
      card:"#ffffff",
        primary:"#2563eb"
    },
};

export const DarkCustomTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: "#292929",
             card:"#212121",
        text:"#FFFFFF",

    },

};
