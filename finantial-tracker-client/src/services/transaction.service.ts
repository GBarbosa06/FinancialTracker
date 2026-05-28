import { api } from "@/services/api"
import type {
  Transaction,
  TransactionFormData,
  TransactionSummary,
} from "@/types/transaction"

export async function getTransactionsRequest() {
  const { data } = await api.get<Transaction[]>("/transactions")
  return data
}

export async function getTransactionSummaryRequest() {
  const { data } = await api.get<TransactionSummary>("/transactions/summary")
  return data
}

export async function createTransactionRequest(payload: TransactionFormData) {
  const { data } = await api.post<Transaction>("/transactions", payload)
  return data
}

export async function updateTransactionRequest(
  id: string,
  payload: Partial<TransactionFormData>,
) {
  const { data } = await api.put<Transaction>(`/transactions/${id}`, payload)
  return data
}

export async function deleteTransactionRequest(id: string) {
  await api.delete(`/transactions/${id}`)
}
