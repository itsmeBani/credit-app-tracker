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

    async createCreditItems(creditId: string, products: ModelProducts[]) {
        try {
            await localDatabase.write(async () => {

                const credit = await this.creditsRepository.getCreditById(creditId);

                const records = [];
                let totalToAdd = 0;

                for (const product of products) {

                    totalToAdd += Number(product.price);


                    const record = this.creditsRepository.createCreditItem({
                        creditId,
                        productId: product.id,
                        quantity: 1,
                        priceAtPurchase: Number(product.price),
                    });


                    records.push(record);
                }

                credit.prepareUpdate((record) => {
                    record.totalAmount += totalToAdd;
                    record.updatedAt = Date.now();
                });

                records.push(credit);

                await localDatabase.batch(...records);
            });

            appToast.success("Item Added", "Credit item added successfully");

        } catch (e) {
            console.log(e);
            appToast.error("Error", "Failed to add credit item");
        }
    }
    async updateItemQuantity(id: string, nextQuantity: number) {
        return await localDatabase.write(async () => {

            const item = await this.creditsRepository.getCreditItemById(id);


            const qty = Math.max(0, nextQuantity);

            const subtotal = item.priceAtPurchase * qty;

            await item.update((record) => {
                record.quantity = qty;
                record.subtotal = subtotal;
                record.updatedAt = Date.now();
            });

            const credit = await this.creditsRepository.getCreditById(item.creditId);


            const items = await this.creditsRepository.getCreditItemsByCreditId(item.creditId);

            const totalAmount = items.reduce(
                (sum, i) => sum + i.priceAtPurchase * i.quantity,
                0
            );

            await this.creditsRepository.updateCreditTotalAmount(
                totalAmount,
                credit
            );


            return item;
        });
    }
    async removeItem() {

    }


}



export  const creditsRepository = new CreditsRepository()
export const creditsService = new CreditsService(creditsRepository)

