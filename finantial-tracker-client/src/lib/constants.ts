export const TOKEN_STORAGE_KEY = "financial-tracker:token"
export const USER_STORAGE_KEY = "financial-tracker:user"

export const TRANSACTIONS_PAGE_SIZE = 8

export const QUERY_KEYS = {
  transactions: ["transactions"] as const,
  summary: ["transactions", "summary"] as const,
  user: ["user"] as const,
}
