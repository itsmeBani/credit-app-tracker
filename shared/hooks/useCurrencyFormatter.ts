export const formatNumber = (value: string) => {
    if (!value) return "";
    const number = Number(value.replace(/,/g, ""));
    if (isNaN(number)) return "";
    return number.toLocaleString("en-US");
};

export const unformatNumber = (value: string) => {
    return value.replace(/,/g, "");
};

export function useCurrencyFormatter() {
    const handlePriceChange = (onChange: (value: string) => void) => {
        return (text: string) => {
            const raw = unformatNumber(text);

            // allow only numbers
            if (!/^\d*$/.test(raw)) return;

            onChange(raw);
        };
    };

    return {
        formatNumber,
        unformatNumber,
        handlePriceChange,
    };
}