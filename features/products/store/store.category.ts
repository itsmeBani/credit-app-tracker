import {create} from "zustand";

interface CategoryActions {
    setActiveCategory: (category: string) => void;
    clearActiveCategory: () => void;

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


    }
}));

export const useCategories=()=>useCategoryStore((state)=>state.activeCategory )
export const useCategoryActions=()=>useCategoryStore((state)=>state.actions )
