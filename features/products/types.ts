import {StaticScreenProps} from "@react-navigation/native";
import ModelProductCategory from "../../local_database/model/model.productCategory";
import ModelProducts from "../../local_database/model/model.products";
import {z} from "zod";
import {manageProductSchema} from "./schema_validation/products";
import {manageCategorySchema} from "./schema_validation/category";


export type ProductsProps = {
    products: ModelProducts[];

};

export type GridItem = | ModelProducts | { id: string; empty: true };


export type CategoryProps = {
    categories: ModelProductCategory[];
};

export type ManageProductRouteProps = StaticScreenProps<{
    productId?: string ;
}>;


export interface CategoryInsertPayload{
    name:string
    description:string | null
    imageUrl:string
    backgroundColor:string
}

export type ProductInsertPayload = z.infer<typeof manageProductSchema>
export type ProductUpdatePayload = z.infer<typeof manageProductSchema>

export type ManageCategoryFormValues = z.infer<typeof manageCategorySchema>
export type ManageProductFormValues = z.infer<typeof manageProductSchema>;


