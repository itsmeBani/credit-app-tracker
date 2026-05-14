import {appToast} from "../../../shared/components/toast";
import {localDatabase} from "../../../local_database";
import {CreditsRepository} from "../data/credits.repository";
import ModelProducts from "../../../local_database/model/model.products";


export class CreditsService {
    constructor(
        private creditsRepository: CreditsRepository
    ) {
    }

    async createCredits(customerId: string) {

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
        } catch (e) {
            console.log(e)


        }
    }

    async createCreditItems(creditId:string , products:ModelProducts[]){


            try {
                return await localDatabase.write(async () => {


                    for (const product of products) {

                        const creditItem = await this.creditsRepository.createCreditItem({
                            creditId,
                            productId: product.id,
                            quantity: 1,
                            priceAtPurchase: Number(product.price),
                        });

                        const credit = await this.creditsRepository.getCreditById(creditId)

                        const totalAmount=creditItem.priceAtPurchase + credit.totalAmount

                        await this.creditsRepository.updateCreditTotalAmount(totalAmount, credit)


                    }
                    appToast.success("Item Added", "Credit item added successfully");

                })


            } catch (e) {
            console.log(e);
            appToast.error("Error", "Failed to add credit item");
        }
    }

    async incrementItemQuantity(id: string,quantity=1) {
        return await localDatabase.write(async () => {

            const item = await this.creditsRepository.getCreditItemById(id)

            const qty = item.quantity + quantity

            const total = item.priceAtPurchase * qty

            await item.update((record) => {
                record.quantity = qty
                record.subtotal = total
                record.updatedAt=Date.now()
            });


            const  credit=await this.creditsRepository.getCreditById(item.creditId)

            const totalAmount=(item.priceAtPurchase * quantity) + credit.totalAmount

            await this.creditsRepository.updateCreditTotalAmount(totalAmount,credit)


            return item
        })
    }

    async decrementItemQuantity(id: string,quantity=1) {
        return await localDatabase.write(async () => {

            const item = await this.creditsRepository.getCreditItemById(id)


        if (item.quantity > quantity){
            const qty = item.quantity - quantity

            const total = item.subtotal - (item.priceAtPurchase * quantity)

            await item.update((record) => {
                record.quantity = qty
                record.subtotal = total
                record.updatedAt=Date.now()
            });

            const  credit=await this.creditsRepository.getCreditById(item.creditId)

            const totalAmount=credit.totalAmount - (item.priceAtPurchase * quantity)

            await this.creditsRepository.updateCreditTotalAmount(totalAmount,credit)

            return item
        }

    })
    }

    async removeItem() {

    }


}