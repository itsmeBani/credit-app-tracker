import {create} from "zustand";
import ModelProducts from "../../../local_database/model/model.products";

import {ProductRepository} from "../data/product.repository";

type ProductStore = {

    selectedProduct: ModelProducts | null
    actions: {
        getProductById: (productId: string) => void

         };
};

const productRepository=new ProductRepository()
const useProductStore = create<ProductStore>((set) => ({
    search: "",
    selectedProduct: null,
    actions: {

        getProductById: async (productId: string) => {

            try {
                const result = await productRepository.getProductDetailsById(productId)

                set({
                    selectedProduct: result,
                });
            } catch (e) {
                console.log(e)
            }
        },
    },
}));


export const useProductDetails = () =>
    useProductStore((state) => state.selectedProduct);

export const useProductActions = () =>
    useProductStore((state) => state.actions);