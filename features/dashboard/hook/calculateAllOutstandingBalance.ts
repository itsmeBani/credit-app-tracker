import ModelCredit from "../../../local_database/model/model.credits";

export function calculateAllOutstandingBalance(credits:ModelCredit[]) {
    return credits.reduce((sum, credit) => {
        const total = credit.totalAmount ?? 0;
        const paid = credit.paidAmount ?? 0;

        const balance = total - paid;

        return sum + Math.max(balance, 0);
    }, 0);
}