import {creditRepository, CreditsRepository} from "../../customers_credit/data/credits.repository";
import {paymentRepository, PaymentsRepository} from "../data/payment.repository";
import {TCreatePayment} from "../types";
import {localDatabase} from "../../../local_database";
import {CreditStatus} from "../../../local_database/types";
import {appToast} from "../../../shared/components/toast";
import {creditsService, CreditsService} from "../../customers_credit/services/credits.service";

class PaymentService {
    constructor(
        private creditRepository: CreditsRepository,
        private paymentsRepository: PaymentsRepository,
        private creditsService:CreditsService
    ) {
    }


    async processOutstandingBalance(payload: TCreatePayment) {
        if (!payload.creditId) return

        try {

        return    await localDatabase.write(async () => {

                const credit = await this.creditRepository.getCreditById(payload.creditId)


                const payment = await this.paymentsRepository.createPayment(payload)




                 const totalPaid=await this.paymentsRepository.getTotalPaidByCreditId(payload.creditId)

                const updatedCredit=await this.creditRepository.updateCreditPaidAmount(totalPaid, credit)

                const status=this.creditsService.checkCreditStatus(updatedCredit.totalAmount, updatedCredit.paidAmount)

              return  await this.creditRepository.updateCreditStatus(updatedCredit, status)

            })
        } catch (e) {
            console.log(e)
            appToast.error(
                "Payment could not be processed",
                "Payment failed"
            )

        }

    }







}



export const paymentService=new PaymentService(creditRepository,paymentRepository,creditsService)