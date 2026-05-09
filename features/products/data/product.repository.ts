import { localDatabase } from "../../../local_database";
import ModelProducts from "../../../local_database/model/model.products";
import { ProductInsertPayload, ProductUpdatePayload } from "../types";
import { Q } from "@nozbe/watermelondb";

export class ProductRepository {
    private collection = localDatabase.get<ModelProducts>("products");
    private categoryCollection = localDatabase.get("product_categories");


    async create(payload: ProductInsertPayload): Promise<ModelProducts> {
        const currentDate = Date.now();


        const category = await this.categoryCollection.find(payload.categoryId);

        if (!category) {
            throw new Error("Invalid category ID");
        }

        return await this.collection.create((product) => {
            product.name = payload.name;
            product.description = payload.description ?? null;
            product.price = payload.price;
            product.imageUrl = payload.imageUrl;
            product.status = payload.status;
            product.categoryId = payload.categoryId;
            product.createdAt = currentDate;
            product.updatedAt = currentDate;
            product.deletedAt = null;
        });
    }


    async update(
        id: string,
        payload: ProductUpdatePayload
    ): Promise<ModelProducts> {
        const product = await this.collection.find(id);

        return await product.update((p) => {
            p.name = payload.name;
            p.description = payload.description;
            p.price = payload.price;
            p.status = payload.status;
            p.categoryId = payload.categoryId;
            p.updatedAt = Date.now();
        });
    }


    async getProductDetailsById(productId: string): Promise<ModelProducts> {
        return await this.collection.find(productId);
    }


    getObservedProducts(search: string) {
        return this.collection
            .query(
                Q.where(
                    "name",
                    Q.like(`%${Q.sanitizeLikeString(search)}%`)
                )
            )
            .observeWithColumns([
                "name",
                "description",
                "image_url",
                "price",
                "status",
                "updated_at",
                "_status",
            ]);
    }
}