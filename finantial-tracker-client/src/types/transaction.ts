export type TransactionType = "income" | "expense"

export type Transaction = {
  id: string
  title: string
  amount: number
  type: TransactionType
  createdAt: string
  userId: string
}

export type TransactionSummary = {
  income: number
  expense: number
  balance: number
}

export type TransactionFilters = {
  search: string
  type: TransactionType | "all"
  period: "all" | "7d" | "30d" | "90d"
}

export type TransactionFormData = {
  title: string
  amount: number
  type: TransactionType
}
