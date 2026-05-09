import ModelProducts from "./model/model.products";
import ModelProductCategory from "./model/model.productCategory";
import ModelCredit from "./model/model.credits";
import ModelCustomers from "./model/modelCustomers";
import ModelImageUploadQueue from "./model/model.imageUploadQueue";

export const models = [
    ModelProductCategory,
    ModelCredit,
    ModelProducts,
    ModelCustomers,
    ModelImageUploadQueue,
] as const

export type TTable = (typeof models)[number]['table']

export type CreditStatus ="UNPAID" | "PARTIAL" | "PAID"



