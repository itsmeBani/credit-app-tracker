import {createStore} from "zustand/vanilla";
import {create} from "zustand";
import {CustomerService} from "../services/customers.service";
import {CustomerInsertPayload} from "../types";
import {CustomersRepository} from "../data/customers.repository";
import {CreditsRepository} from "../data/credits.repository";
import {CreditsService} from "../services/credits.service";
import ModelCredit from "../../../local_database/model/model.credits";

interface CreditsAction{
    createCredits:(customerId:string)=>void,
    createCreditItems:()=>void
    getCustomerCredits:(id:string)=>void
}
interface CreditsState {
    actions:CreditsAction
    selectedCredits:ModelCredit[]
}


const creditRepository = new CreditsRepository();

const customerService = new CreditsService(creditRepository);

const useCreditsStore=create<CreditsState>((set) => ({
   selectedCredits:[],
    actions : {
        createCredits:async (customerId:string)=>{
            const newCredit= await  customerService.createCredits(customerId)
            if (!newCredit) return;

            set((state) => ({
                selectedCredits: [newCredit, ...state.selectedCredits],
            }));
        },
        createCreditItems:async ()=>{

        },

        getCustomerCredits:async (id:string)=>{
               const credits=await creditRepository.getAllCustomerCredits(id)
               set({
                selectedCredits: credits,
                });
        }
    }
}))


export const useCreditsActions=()=>useCreditsStore((state)=>state.actions )

export const useCustomerCredits = () =>
    useCreditsStore((state) => state.selectedCredits);