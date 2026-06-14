import CreditsRepository, {creditRepository} from "../../customers_credit/data/credits.repository";
import {paymentRepository, PaymentsRepository} from "../data/payment.repository";
import {TCreatePayment} from "../types";
import {localDatabase} from "../../../local_database";
import {CreditStatus} from "../../../local_database/types";
import {appToast} from "../../../shared/components/toast";

class PaymentService {
    constructor(
        private creditRepository: CreditsRepository,
        private paymentsRepository: PaymentsRepository
    ) {
    }


    async processOutstandingBalance(payload: TCreatePayment) {
        if (!payload.creditId) return

        try {

        return    await localDatabase.write(async () => {

                const credit = await this.creditRepository.getCreditById(payload.creditId)


                const payment = await this.paymentsRepository.createPayment(payload)




                 const totalPaid=await this.paymentsRepository.getTotalPaidByCreditId(payload.creditId)

                const paymentStatus=this.checkPaymentStatus(totalPaid, credit.totalAmount)

                return await this.creditRepository.updateCreditPaidAmount(totalPaid, credit, paymentStatus)
            })
        } catch (e) {
            console.log(e)
            appToast.error(
                "Payment could not be processed",
                "Payment failed"
            )

        }

    }

     checkPaymentStatus(amount:number,balance:number):CreditStatus{
        if (amount <= 0){
          return  "UNPAID"
        }else if (amount < balance){
            return  "PARTIAL"
        }
        return "PAID"
    }





}



export const paymentService=new PaymentService(creditRepository,paymentRepository)