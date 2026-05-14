export const formatAmount = (
    amount: number | string,
    options?: {
        currency?: string;
        locale?: string;
        minimumFractionDigits?: number;
        maximumFractionDigits?: number;
    }
) => {
    const {
        currency = "PHP",
        locale = "en-PH",
        minimumFractionDigits = 2,
        maximumFractionDigits = 2,
    } = options || {};

    const value =
        typeof amount === "string"
            ? parseFloat(amount)
            : amount;

    if (isNaN(value)) {
        return "₱0.00";
    }

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(value);
};