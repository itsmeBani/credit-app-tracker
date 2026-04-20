import { create } from "zustand";

type ProductStore = {
    search: string;
    actions: {
        setSearch: (value: string) => void;
        clearSearch: () => void;
    };
};

 const useProductStore = create<ProductStore>((set) => ({
    search: "",

    actions: {
        setSearch: (value) =>
            set(() => ({
                search: value,
            })),

        clearSearch: () =>
            set(() => ({
                search: "",
            })),
    },
}));


export const useProductSearch = () =>
    useProductStore((state): string => state.search as string);

export const useProductActions = () =>
    useProductStore((state) => state.actions);