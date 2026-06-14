import ModelCustomers from "../../local_database/model/modelCustomers";
import {StaticScreenProps} from "@react-navigation/native";
import {manageCustomerSchema} from "./schema_validation/customer";
import {z} from "zod";

export interface CustomerCardProps {

    data?:ModelCustomers
    onClick:()=>void
}



export type CustomerInsertPayload = z.infer<typeof manageCustomerSchema>
export type ManageCustomerFormValues = z.infer<typeof manageCustomerSchema>

export  type CustomersProps={
    customers:ModelCustomers[]
}



