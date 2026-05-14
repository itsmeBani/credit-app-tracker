import { z } from "zod";

export const manageCustomerSchema = z.object({
    firstname: z
        .string()
        .min(3, "Please enter first name")
        .max(200, "First name is too long"),

    lastname: z
        .string()
        .min(1, "Please enter last name")
        .max(200, "Last name is too long"),
});