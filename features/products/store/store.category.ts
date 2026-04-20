import { create } from "zustand";
import {localDatabase} from "../../../local_database";
import ModelProductCategory from "../../../local_database/model/model.productCategory";

interface CategoryActions {
    setActiveCategory: (category: string) => void;
    clearActiveCategory: () => void;
    createCategory: () => void;
    deleteAllCategories:()=>void
}

type CategoryState = {
    activeCategory: string;
    actions:CategoryActions
};

 const useCategoryStore = create<CategoryState>((set, get) => ({
    activeCategory: "",
    actions:{
        setActiveCategory: (category) =>
            set((state) => ({
                activeCategory:
                    state.activeCategory === category ? "" : category,
            })),

        clearActiveCategory: () => set({ activeCategory: "" }),
        createCategory : async()=>{

                const now = Date.now()

                await localDatabase.write(async () => {
                    await localDatabase
                        .get<ModelProductCategory>('product_categories')
                        .create(category => {
                            category.name = 'test'
                            category.description = 'uho'
                            category.imageUrl =
                                'https://res.cloudinary.com/ddrn6ok5m/image/upload/e_background_removal/f_png/v1775800201/91195ba2-184e-4964-a1f7-6e5e22ef50ce_njbdgj.png'
                            category.backgroundColor = '#bfdbfe'
                            category.createdAt = now
                            category.updatedAt = now
                            category.deletedAt = null
                        })
                })

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
