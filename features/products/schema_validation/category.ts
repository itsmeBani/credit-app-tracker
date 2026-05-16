import {z} from "zod";

export const manageCategorySchema = z.object({
    name: z
        .string()
        .min(1, "Please enter a product name")
        .max(255, "Product name is too long"),

    description: z
        .string()
        .max(500, "Description must not exceed 500 characters"),


    imageUrl: z
        .string()
        .min(1, "Please provide an image"),

    backgroundColor: z
        .string()
        .min(1, "Please enter a product name")
});