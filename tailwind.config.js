/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.tsx",
        "./index.ts",
        "./features/**/*.{js,jsx,ts,tsx}",
        "./shared/**/*.{js,jsx,ts,tsx}",
        "./shared/components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            fontFamily: {
                jakarta: ["PlusJakartaSans"],
                jakartaBold: ["PlusJakartaSans"], // use weight instead
                barlow: ["Barlow"],
                number:["Number"]
            },
        },
    },
    darkMode:"class",
    plugins: [],
};