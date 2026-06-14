import {localDatabase} from "../../../local_database";
import ModelProductCategory from "../../../local_database/model/model.productCategory";
import ModelPayment from "../../../local_database/model/model.payments";
import { TCreatePayment} from "../types";
import {Q} from "@nozbe/watermelondb";

export class PaymentsRepository {

    private collection = localDatabase.get<ModelPayment>("payments");





    async createPayment(payload:TCreatePayment){
        return await this.collection.create(payment => {
            payment.creditId = payload.creditId
            payment.amount = payload.amount
            payment.note = payload.note ?? ''

            payment.createdAt = Date.now()
            payment.updatedAt = Date.now()
            payment.deletedAt = null
        })

    }
    async getTotalPaidByCreditId(creditId: string) {
        const payments = await this.collection
            .query(
                Q.where("credit_id", creditId)
            )
            .fetch();

        return payments.reduce((total, payment) => {
            return total + payment.amount;
        }, 0);
    }
    async getPaymentsByCreditId(creditId: string): Promise<ModelPayment[]> {
        return await this.collection
            .query(
                Q.where('credit_id', creditId),
                Q.where('deleted_at', null)
            )
            .fetch()
    }
}

export const paymentRepository=new PaymentsRepository()