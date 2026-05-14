import { ProductRepository } from "../data/product.repository";
import { ProductInsertPayload, ProductUpdatePayload } from "../types";
import { ImageUploadService } from "../../uploads/services/ImageUploadService";
import { appToast } from "../../../shared/components/toast";
import { localDatabase } from "../../../local_database";


export class ProductService {

    constructor(
        private productRepository: ProductRepository,
        private imageService: ImageUploadService
    ) {}


    async createProduct(payload: ProductInsertPayload) {
        try {
            await localDatabase.write(async () => {

                const localImageUrl = this.imageService.saveImageToLocal(
                    payload.imageUrl
                );


                const newProduct = {
                    ...payload,
                    imageUrl: localImageUrl,
                };

                const product = await this.productRepository.create(newProduct);



                await this.imageService.addToQueue({
                    referenceTable: "products",
                    referenceId: product.id,
                    localUri: localImageUrl,
                });
            });

            appToast.success("Successfully created");
        } catch (e) {
            console.log(e);
            appToast.error("Failed to create product");
        }
    }


    async updateProduct(id: string, payload: ProductUpdatePayload) {
        try {
            await localDatabase.write(async () => {

                const product = await this.productRepository.update(
                    id,
                    payload
                );

                // TODO: handle image update logic
                //     await this.imageService.addToQueue({
                //         referenceTable: "products",
                //         referenceId: product.id,
                //         localUri: localImageUrl,
                //     });

            });

            appToast.success("Successfully updated");
        } catch (e) {
            console.log(e);
            appToast.error("Failed to update product");
        }
    }
}