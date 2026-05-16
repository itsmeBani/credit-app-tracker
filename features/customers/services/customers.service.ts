import {CustomersRepository} from "../data/customers.repository";
import {CustomerInsertPayload} from "../types";
import {localDatabase} from "../../../local_database";
import {appToast} from "../../../shared/components/toast";

export  class  CustomerService{
    constructor(private customerRepository:  CustomersRepository) {}
    async createCustomer (payload:CustomerInsertPayload){
        try {
            await localDatabase.write(async () => {
                await this.customerRepository.create(payload)

                appToast.success("Customer Created","Successfully created")
            })
        }catch (e) {
            console.log(e)
        }



    }
}


export const customersRepository = new CustomersRepository();
export  const customersService=new CustomerService(customersRepository)
