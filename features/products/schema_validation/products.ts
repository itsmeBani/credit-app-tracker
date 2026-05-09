import { z } from "zod";

const parsePrice = (val: string) => Number(val.replace(/,/g, ""));

export const manageProductSchema = z.object({
    name: z
        .string()
        .min(1, "Please enter a product name")
        .max(255, "Product name is too long"),

    description: z
        .string()
        .max(500, "Description must not exceed 500 characters")
        .nullable(),

    price: z
        .string()
        .min(1, "Please enter a price")
        .refine((val) => {
            const num = parsePrice(val);
            return !isNaN(num);
        }, "Please enter a valid number")
        .refine((val) => {
            const num = parsePrice(val);
            return num > 0;
        }, "Price must be greater than 0")
        .refine((val) => {
            const num = parsePrice(val);
            return num <= 10000;
        }, "Maximum price allowed is 10,000"),
    imageUrl: z
        .string()
        .min(1, "Please provide an image"),
    status: z.enum(["AVAILABLE", "UNAVAILABLE"]),
    categoryId: z.uuid("Invalid category ID"),
});