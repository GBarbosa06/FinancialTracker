import { z } from "zod";

export const CreateTransactionSchema = z.object({
    title: z
            .string()
            .min(1, "TITLE_REQUIRED"),
    amount: z.coerce
            .number()
            .positive("AMOUNT_MUST_BE_GREATER_THAN_ZERO"),
    type: z
            .enum(["income", "expense"])
});

export const UpdateTransactionSchema = CreateTransactionSchema.partial();
