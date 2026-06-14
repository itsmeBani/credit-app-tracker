import {CategoryInsertPayload} from "../types";
import {localDatabase} from "../../../local_database";
import ModelProductCategory from "../../../local_database/model/model.productCategory";

export class ProductCategoryRepository {
    private collection = localDatabase.get<ModelProductCategory>("product_categories");


    async create(payload: CategoryInsertPayload): Promise<ModelProductCategory> {
        const currentData = Date.now();

        return await this.collection.create((category) => {
            category.name = payload.name;
            category.description = payload.description;
            category.imageUrl = payload.imageUrl;
            category.backgroundColor = payload.backgroundColor;
            category.createdAt = currentData;
            category.updatedAt = currentData;
            category.deletedAt = null;
        });
    }


    async update(id: string, payload: Partial<CategoryInsertPayload>) {
        const category = await this.collection.find(id);

        await category.update((c) => {
            if (payload.name !== undefined) c.name = payload.name;
            if (payload.description !== undefined) c.description = payload.description;
            if (payload.imageUrl !== undefined) c.imageUrl = payload.imageUrl;
            if (payload.backgroundColor !== undefined) c.backgroundColor = payload.backgroundColor;

            c.updatedAt = Date.now();
        });

        return category;
    }


    getObservedProductCategories() {
        return this.collection
            .query()
            .observeWithColumns([
                "name",
                "description",
                "image_url",
                "background_color",
                "updated_at",
                "_status",
            ]);
    }


    async getProductCategories(): Promise<ModelProductCategory[]> {
        return await this.collection.query().fetch();
    }
    getObservedProductCategoryCount() {
        return this.collection.query().observeCount();
    }


}


