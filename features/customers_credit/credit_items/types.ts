import {StaticScreenProps} from "@react-navigation/native";

export interface CreateCreditItemPayload {
    creditId: string
    productId: string
    quantity: number
    priceAtPurchase: number
}
export type CustomerItemsCreditParams=StaticScreenProps<{
    creditId: string ;
}>;

export type CreateCustomerItemsCreditParams=CustomerItemsCreditParams

