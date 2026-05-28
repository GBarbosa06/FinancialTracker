import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/lib/constants"
import {
  createTransactionRequest,
  deleteTransactionRequest,
  getTransactionSummaryRequest,
  getTransactionsRequest,
  updateTransactionRequest,
} from "@/services/transaction.service"
import type { TransactionFormData } from "@/types/transaction"

export function useTransactions() {
  return useQuery({
    queryKey: QUERY_KEYS.transactions,
    queryFn: getTransactionsRequest,
  })
}

export function useTransactionSummary() {
  return useQuery({
    queryKey: QUERY_KEYS.summary,
    queryFn: getTransactionSummaryRequest,
  })
}

export function useTransactionMutations() {
  const queryClient = useQueryClient()

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions })
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.summary })
  }

  const createMutation = useMutation({
    mutationFn: createTransactionRequest,
    onSuccess: invalidate,
  })

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: Partial<TransactionFormData>
    }) => updateTransactionRequest(id, payload),
    onSuccess: invalidate,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTransactionRequest,
    onSuccess: invalidate,
  })

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
