import { CategoryInsertPayload } from "../types";
import { ProductCategoryRepository } from "../data/category.repository";
import { ImageUploadService } from "../../uploads/services/ImageUploadService";
import { appToast } from "../../../shared/components/toast";
import { localDatabase } from "../../../local_database";

export class ProductCategoryService {
    constructor(
        private categoryRepository: ProductCategoryRepository,
        private imageService: ImageUploadService
    ) {}


    async createProductCategory(payload: CategoryInsertPayload) {
        try {
            await localDatabase.write(async () => {

                const localImageUrl =  this.imageService.saveImageToLocal(
                    payload.imageUrl
                );

                const newCategory = {
                    ...payload,
                    imageUrl: localImageUrl,
                };

                const category = await this.categoryRepository.create(newCategory);

                await this.imageService.addToQueue({
                    referenceTable: "product_categories",
                    referenceId: category.id,
                    localUri: localImageUrl,
                });
            });

            appToast.success("Category has been added.", "Category created");
        } catch (e) {
            console.log(e);
            appToast.error("Please try again.", "Failed to create category");
        }
    }
}