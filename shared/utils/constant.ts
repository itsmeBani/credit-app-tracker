import {DarkTheme, DefaultTheme} from "@react-navigation/native";



export const GRID_COLUMN = 2

export const API_BASE_URL = "https://proud-doorbell-dimmed.ngrok-free.dev/v1";


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

export const COLOR_PALETTE = [
    { name: "green-120", hex: "#D6FBE3", base: "#22C55E" },   // green-500
    { name: "blue-120", hex: "#D5E6FD", base: "#3B82F6" },    // blue-500
    { name: "yellow-120", hex: "#FEF6B8", base: "#EAB308" },  // yellow-500
    { name: "red-120", hex: "#FEDADA", base: "#EF4444" },     // red-500
    { name: "purple-120", hex: "#F0E0FF", base: "#A855F7" },  // purple-500
    { name: "pink-120", hex: "#FBE0EE", base: "#EC4899" },    // pink-500
    { name: "indigo-120", hex: "#DAE2FF", base: "#6366F1" },  // indigo-500
    { name: "cyan-120", hex: "#C7F7FD", base: "#06B6D4" },    // cyan-500
    { name: "orange-120", hex: "#FFE7C7", base: "#F97316" },  // orange-500
    { name: "emerald-120", hex: "#CAF7DF", base: "#10B981" }, // emerald-500
];