import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteTransactionDialog } from "@/components/transactions/delete-transaction-dialog"
import { TransactionFiltersBar } from "@/components/transactions/transaction-filters"
import { TransactionFormDialog } from "@/components/transactions/transaction-form-dialog"
import { TransactionList } from "@/components/transactions/transaction-list"
import { PaginationControls } from "@/components/shared/pagination-controls"
import { TRANSACTIONS_PAGE_SIZE } from "@/lib/constants"
import {
  filterTransactions,
  paginateTransactions,
} from "@/lib/transactions"
import { useTransactions } from "@/hooks/use-transactions"
import type { Transaction, TransactionFilters } from "@/types/transaction"

export function TransactionsPage() {
  const transactionsQuery = useTransactions()
  const [filters, setFilters] = useState<TransactionFilters>({
    search: "",
    type: "all",
    period: "all",
  })
  const [page, setPage] = useState(1)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)

  const filteredTransactions = useMemo(() => {
    return filterTransactions(transactionsQuery.data ?? [], filters)
  }, [transactionsQuery.data, filters])

  const pagination = useMemo(() => {
    return paginateTransactions(
      filteredTransactions,
      page,
      TRANSACTIONS_PAGE_SIZE,
    )
  }, [filteredTransactions, page])

  function openCreate() {
    setSelectedTransaction(null)
    setFormOpen(true)
  }

  function openEdit(transaction: Transaction) {
    setSelectedTransaction(transaction)
    setFormOpen(true)
  }

  function openDelete(transaction: Transaction) {
    setSelectedTransaction(transaction)
    setDeleteOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Movimentações</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie receitas e despesas com filtros e paginação.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Nova transação
        </Button>
      </div>

      <TransactionFiltersBar
        filters={filters}
        onChange={(nextFilters) => {
          setFilters(nextFilters)
          setPage(1)
        }}
      />

      <TransactionList
        transactions={pagination.items}
        isLoading={transactionsQuery.isLoading}
        onCreate={openCreate}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      <PaginationControls
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        onPageChange={setPage}
      />

      <TransactionFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        transaction={selectedTransaction}
      />

      <DeleteTransactionDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        transaction={selectedTransaction}
      />
    </div>
  )
}
