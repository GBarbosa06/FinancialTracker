import { z } from "zod"

export const transactionSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  amount: z.number().positive("Valor deve ser maior que zero"),
  type: z.enum(["income", "expense"]),
})

export type TransactionSchema = z.infer<typeof transactionSchema>
