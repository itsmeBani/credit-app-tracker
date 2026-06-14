import ModelCredit from "../../../local_database/model/model.credits";
import {StaticScreenProps} from "@react-navigation/native";

export interface CustomerCreditStatusProps{
    credit:ModelCredit,
    onPress:()=>void
}
export type CustomerCreditParams = StaticScreenProps<{
    id: string ;
    lastname:string
    firstname:string
}>;