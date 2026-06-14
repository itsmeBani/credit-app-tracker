import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


export  interface ActionCardProps
{
    title ? : string;
    icon ? : keyof
    typeof MaterialCommunityIcons.glyphMap;
    onPress ? : () => void;
    backgroundColor ? : string;
    iconColor ? : string;
    size ? : number;
    width ? : number;
}

export interface IMetric{
    customersCount:number
    productsCount:number
    productCategoriesCount:number
    creditCount:number
}