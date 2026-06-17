import {localDatabase} from "../../../local_database";
import ModelCustomers from "../../../local_database/model/modelCustomers";
import ModelCreditItem from "../../../local_database/model/model.creditItems";
import ModelCredit from "../../../local_database/model/model.credits";
import {Q} from "@nozbe/watermelondb";

import {CreditStatus} from "../../../local_database/types";

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

    createCreditItem({
                                creditId,
                                productId,
                                quantity = 1,
                                priceAtPurchase,
                            }: {
        creditId: string;
        productId: string;
        quantity?: number;
        priceAtPurchase: number;
    }) {
        return this.creditItemsCollection
            .prepareCreate((item) => {
                item.creditId = creditId;
                item.productId = productId;
                item.quantity = quantity;
                item.priceAtPurchase = priceAtPurchase;
                item.subtotal = priceAtPurchase * quantity;
            });
    }


    async updateCreditTotalAmount (amount:number,credit:ModelCredit){
     return   await credit.update((record) => {
            record.totalAmount = amount
            record.updatedAt = Date.now()


        })
    }
    async updateCreditPaidAmount (amount:number,credit:ModelCredit){

        return await credit.update((record) => {
            record.paidAmount = amount
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

    getObserveCreditById(id:string){
        return   this.creditsCollection.findAndObserve(id)
    }
    getCreditItemCounts(id:string){
                return this.creditItemsCollection.query(
                    Q.where("credit_id",id)).observeCount()
    }

    getObservedCreditCount() {
        return this.creditsCollection.query().observeCount();
    }

    getActiveCreditDebts() {
        return this.creditsCollection
            .query(
                Q.where("status", Q.oneOf(["UNPAID", "PARTIAL"]))
            )
            .observeWithColumns([
                "total_amount",
                "paid_amount",
            ]);
    }


    async updateCreditStatus(credit:ModelCredit,status:CreditStatus){
        return await credit.update((record) => {
            record.status =status
        })
    }




}



export const creditRepository=new CreditsRepository()