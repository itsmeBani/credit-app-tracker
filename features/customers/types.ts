import ModelCustomers from "../../local_database/model/modelCustomers";
import {StaticScreenProps} from "@react-navigation/native";

import {manageProductSchema} from "../products/schema_validation/products";
import {manageCustomerSchema} from "./schema_validation/customer";
import {z} from "zod";
import ModelCredit from "../../local_database/model/model.credits";

export interface CustomerCardProps {

    data?:ModelCustomers
    onClick:()=>void
}

export type CustomerCreditParams = StaticScreenProps<{
    id: string ;
}>;

export type CustomerInsertPayload = z.infer<typeof manageCustomerSchema>
export type ManageCustomerFormValues = z.infer<typeof manageCustomerSchema>

export  type CustomersProps={
    customers:ModelCustomers[]
}

export interface CustomerCreditsProps extends CustomerCreditParams {
    credits: ModelCredit[];
}

export interface CustomerCreditStatusProps{
    data:ModelCredit,
    onPress:()=>void
}