import {create} from "zustand";
import ModelProducts from "../../../local_database/model/model.products";
import {ManageProductFormValues, ProductInsertPayload} from "../types";

import {ProductService} from "../services/product.service";
import {ProductRepository} from "../data/product.repository";
import {ImageUploadService} from "../../uploads/services/ImageUploadService";

type ProductStore = {
    search: string;
    selectedProduct: ModelProducts | null
    actions: {
        setSearch: (value: string) => void;
        clearSearch: () => void;
        getProductById: (productId: string) => void
        updateProduct: (id: string, newData: ManageProductFormValues) => void
        createProduct: (payload: ProductInsertPayload) => void
    };
};
const productRepository =new ProductRepository();
const imageService=new ImageUploadService()
const productService = new ProductService(
    productRepository,
    imageService,
);

const useProductStore = create<ProductStore>((set) => ({
    search: "",
    selectedProduct: null,
    actions: {
        setSearch: (value) => set(() => ({search: value,})),


        clearSearch: () => set({search: ""}),

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

        createProduct: async (payload: ProductInsertPayload) => {
            await productService.createProduct(payload)
        },

        updateProduct: async (id: string, newData: ManageProductFormValues) => {
            await productService.updateProduct(id, newData)
        }
    },
}));


export const useProductSearch = () =>
    useProductStore((state): string => state.search as string);
export const useProductDetails = () =>
    useProductStore((state) => state.selectedProduct);

export const useProductActions = () =>
    useProductStore((state) => state.actions);