import {localDatabase} from "../../../local_database";
import ModelCustomers from "../../../local_database/model/modelCustomers";
import ModelCreditItem from "../../../local_database/model/model.creditItems";
import ModelCredit from "../../../local_database/model/model.credits";
import {Q} from "@nozbe/watermelondb";


export class CreditsRepository{
    private creditsCollection = localDatabase.get<ModelCredit>("credits");
    private creditItemsCollection = localDatabase.get<ModelCreditItem>("credit_items");



    async createCredits(customerId:string){
        const now = Date.now();

        return await
            this.creditsCollection.create((credit) => {
                credit.customerId =customerId;
                credit.totalAmount = 0
                credit.paidAmount = 0
                credit.status ="UNPAID"
                credit.createdAt = now;
                credit.updatedAt = now;
                credit.deletedAt = null;
            });
    }
    async createCreditItems(){

    }
    getObservedCredits(customerId: string) {
        return this.creditsCollection
            .query(Q.where("customer_id", customerId))
            .observeWithColumns([
                "updated_at",
                 "status",
                "paid_amount",
                "total_amount"
            ]);
    }

    getAllCustomerCredits(customerId: string) {
        return this.creditsCollection
            .query(Q.where("customer_id", customerId))
            .fetch()
    }
}