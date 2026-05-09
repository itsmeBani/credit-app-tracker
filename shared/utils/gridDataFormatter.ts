type GridItem<T> = T & {
    empty?: boolean;
};

export function formatGridData<T extends { id: string | number }>(
    data: T[],
    numberOfColumns: number
): GridItem<T>[] {
    const newData: GridItem<T>[] = [...data];

    const fullRows = Math.floor(newData.length / numberOfColumns);
    let lastRowElements = newData.length - fullRows * numberOfColumns;

    while (lastRowElements !== numberOfColumns && lastRowElements !== 0) {
        newData.push({
            id: `empty-${lastRowElements}`,
            empty: true,
        } as GridItem<T>);

        lastRowElements++;
    }

    return newData;
}