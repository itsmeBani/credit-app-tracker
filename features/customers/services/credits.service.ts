import {CustomersRepository} from "../data/customers.repository";
import {CreditsRepository} from "../data/credits.repository";
import {appToast} from "../../../shared/components/toast";
import {localDatabase} from "../../../local_database";

export  class  CreditsService {
    constructor(private creditsRepository: CreditsRepository) {}

    async  createCredits(customerId:string){

        if (!customerId) {
            appToast.warning("Invalid Customer id", "Customer ID not found")
            return
        }

        try {
            const newCredit = await localDatabase.write(async () => {
                return await this.creditsRepository.createCredits(customerId);
            });

            appToast.success("You can now add items", "Credit Created");

            return newCredit;
        }catch (e) {
            console.log(e)


        }
    }
    async  createCreditItems(){

    }


}