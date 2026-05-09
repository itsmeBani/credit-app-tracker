import {create} from "zustand";
import {localDatabase} from "../../../local_database";
import {CategoryInsertPayload} from "../types";
import {ProductCategoryService} from "../services/category.service";
import {ProductCategoryRepository} from "../data/category.repository";
import {ImageUploadService} from "../../uploads/services/ImageUploadService";

interface CategoryActions {
    setActiveCategory: (category: string) => void;
    clearActiveCategory: () => void;
    createCategory: (category:CategoryInsertPayload) => void;
    deleteAllCategories:()=>void
}

type CategoryState = {
    activeCategory: string;
    actions:CategoryActions
};


const categoryRepository = new ProductCategoryRepository();
const imageService = new ImageUploadService();

export const productCategoryService = new ProductCategoryService(
    categoryRepository,
    imageService
);

 const useCategoryStore = create<CategoryState>((set, get) => ({
    activeCategory: "",

     actions:{
        setActiveCategory: (category) =>
            set((state) => ({
                activeCategory:
                    state.activeCategory === category ? "" : category,
            })),

        clearActiveCategory: () => set({ activeCategory: "" }),
        createCategory : async(category:CategoryInsertPayload)=>{
           await productCategoryService.createProductCategory(category)
        },
        deleteAllCategories: async()=>{

                await localDatabase.write(async () => {
                    const all = await localDatabase.get('product_categories').query().fetch()
                    for (const item of all) {
                        await item.destroyPermanently()
                    }
                })

        }

    },
}));

export const useCategories=()=>useCategoryStore((state)=>state.activeCategory )
export const useCategoryActions=()=>useCategoryStore((state)=>state.actions )
