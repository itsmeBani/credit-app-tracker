import {createStore} from "zustand/vanilla";
import {create} from "zustand";
import {CustomerService} from "../services/customers.service";
import {CustomerInsertPayload} from "../types";
import {CustomersRepository} from "../data/customers.repository";

interface CustomerAction{
    createCustomer:(payload:CustomerInsertPayload)=>void
}
interface CustomerState {
    actions:CustomerAction
}


const customerRepository = new CustomersRepository();
const customerService = new CustomerService(customerRepository);

const useCustomerStore=create<CustomerState>((set) => ({
actions : {
    createCustomer: async (payload:CustomerInsertPayload)=>{
       await customerService.createCustomer(payload)
    }
}
}))


export const useCustomersActions=()=>useCustomerStore((state)=>state.actions )
