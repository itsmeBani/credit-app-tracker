import {localDatabase} from "../../../local_database";
import ModelProducts from "../../../local_database/model/model.products";
import ModelProductCategory from "../../../local_database/model/model.productCategory";
import {UploadQueueTable} from "../types";


export const imageUpdateResolvers: Record<
    UploadQueueTable,
    (id: string, url: string) => Promise<void>
> = {
    products: async (id:string, url:string) => {
        const ref = await localDatabase.get<ModelProducts>("products").find(id)

        await ref.update((r) => {
            r.imageUrl = url
        })
    },

    product_categories: async (id:string, url:string) => {
        const ref = await localDatabase
            .get<ModelProductCategory>("product_categories")
            .find(id)

        await ref.update((r) => {
            r.imageUrl = url
        })
    },
}