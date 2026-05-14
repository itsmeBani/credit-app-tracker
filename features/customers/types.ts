import ModelCustomers from "../../local_database/model/modelCustomers";
import {StaticScreenProps} from "@react-navigation/native";

import {manageProductSchema} from "../products/schema_validation/products";
import {manageCustomerSchema} from "./schema_validation/customer";
import {z} from "zod";
import ModelCredit from "../../local_database/model/model.credits";
import CustomerItemsCreditScreen from "./screens/child-screens/CustomerItemsCreditScreen";
import ModelProducts from "../../local_database/model/model.products";

export interface CustomerCardProps {

    data?:ModelCustomers
    onClick:()=>void
}

export type CustomerCreditParams = StaticScreenProps<{
    id: string ;
    lastname:string
    firstname:string
}>;
export type CustomerItemsCreditParams=StaticScreenProps<{
    creditId: string ;
}>;
export type CustomerInsertPayload = z.infer<typeof manageCustomerSchema>
export type ManageCustomerFormValues = z.infer<typeof manageCustomerSchema>

export  type CustomersProps={
    customers:ModelCustomers[]
}



export interface CustomerCreditStatusProps{
    credit:ModelCredit,
    onPress:()=>void
}


export interface CreateCreditItemPayload {
    creditId: string
    productId: string
    quantity: number
    priceAtPurchase: number
}