import {StaticScreenProps} from "@react-navigation/native";
import ModelProductCategory from "../../local_database/model/model.productCategory";
import ModelProducts from "../../local_database/model/model.products";

export interface Category {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    deleteAt: Date | null;
    backgroundColor:string | null
    imageUrl:string | null
}


export  interface IProducts{
    id: number;
    createdAt: Date;
    name: string;
    imageUrls: string[];
    description: string | null;
    price: number;
    updatedAt: Date ;
    status: "AVAILABLE" | "UNAVAILABLE";
    categoryId: number;
    category:Category
}
export type ProductsProps = {
    products: ModelProducts[];
};

export type GridItem = | ModelProducts | { id: string; empty: true };


export type CategoryProps = {
    categories: ModelProductCategory[];
};

export type ManageProductRouteProps = StaticScreenProps<{
    productId: string ;
}>;
