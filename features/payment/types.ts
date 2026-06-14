import {StaticScreenProps} from "@react-navigation/native";

export type CreatePaymentParams=StaticScreenProps<{
    creditId: string ;
}>;

export type ViewPaymentsParams=StaticScreenProps<{
    creditId: string ;
}>;

export interface TCreatePayment{
    creditId: string;
    amount: number;
    note?: string;
}