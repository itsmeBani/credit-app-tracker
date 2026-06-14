import {create} from "zustand";
import ModelProducts from "../../../../local_database/model/model.products";

type ItemSelectionState = {
    selected: ModelProducts[];

    actions: {
        toggleItem: (item: ModelProducts) => void;
        isSelected: (id: string) => boolean;
        clearItem: () => void;

    };
};

 const useItemSelection = create<ItemSelectionState>((set, get) => ({
    selected: [],

    actions: {
        toggleItem: (item) => {
            const current = get().selected;

            const exists = current.some((p) => p.id === item.id);

            if (exists) {
                set({
                    selected: current.filter((p) => p.id !== item.id),
                });
            } else {
                set({
                    selected: [...current, item],
                });
            }
        },

        isSelected: (id) => {
            return get().selected.some((p) => p.id === id);
        },

        clearItem: () => set({ selected: [] }),


}}));

export const useItemSelectionTotal = () =>
    useItemSelection((state) =>
        state.selected.reduce(
            (sum, item) => sum + Number(item.price),
            0
        )
    );

export const useItemSelectionCount = () =>
    useItemSelection((state) => state.selected.length);

export const useItemSelectionState = () =>
    useItemSelection((state) => state.selected);

export const useItemSelectionActions = () =>
    useItemSelection((state) => state.actions);


