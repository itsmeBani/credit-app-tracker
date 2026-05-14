import {localDatabase} from "../../../local_database";
import ModelCustomers from "../../../local_database/model/modelCustomers";
import ModelCreditItem from "../../../local_database/model/model.creditItems";
import ModelCredit from "../../../local_database/model/model.credits";
import {Q} from "@nozbe/watermelondb";
import {CreateCreditItemPayload} from "../types";


export class CreditsRepository {
    private creditsCollection = localDatabase.get<ModelCredit>("credits");
    private creditItemsCollection = localDatabase.get<ModelCreditItem>("credit_items");
    private customerCollection = localDatabase.get<ModelCustomers>("customers");


    async createCredits(customerId: string) {
        const now = Date.now();

        return await
            this.creditsCollection.create((credit) => {
                credit.customerId = customerId;
                credit.totalAmount = 0
                credit.paidAmount = 0
                credit.status = "UNPAID"
                credit.createdAt = now;
                credit.updatedAt = now;
                credit.deletedAt = null;
            });
    }

    async createCreditItem({
                               creditId,
                               productId,
                               quantity,
                               priceAtPurchase,
                           }:CreateCreditItemPayload) {
        const now = Date.now()
        const subtotal = quantity * priceAtPurchase


         // const credit=await this.getCreditById(creditId)
        {

            return await this.creditItemsCollection.create((item) => {
                item.creditId = creditId
                item.productId = productId

                item.quantity = quantity
                item.priceAtPurchase = priceAtPurchase
                item.subtotal = subtotal

                item.createdAt = now
                item.updatedAt = now
                item.deletedAt = null
            })

        }
    }

    async updateCreditTotalAmount (amount:number,credit:ModelCredit){
        await credit.update((record) => {
            record.totalAmount = amount
            record.updatedAt = Date.now()
        })
    }





    getObservedCredits(customerId: string) {
        return this.creditsCollection
            .query(Q.where("customer_id", customerId)).extend(
                Q.sortBy('created_at', Q.desc)
            )
            .observeWithColumns([
                "updated_at",
                "status",
                "paid_amount",
                "total_amount"
            ]);
    }



     getCreditItemsByCreditId(
        creditId: string
    ){
       return  this.creditItemsCollection.query(
            Q.where("credit_id", creditId),
            Q.sortBy("created_at", Q.asc)
        )
    }


    async getCreditItemById (id:string){
        return await this.creditItemsCollection.find(id)
    }

    async getCreditById(id:string){
     return  await this.creditsCollection.find(id)
    }





}

export default CreditsRepository