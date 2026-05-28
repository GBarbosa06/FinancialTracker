import { Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { formatCurrency, formatDate } from "@/lib/format"
import type { Transaction } from "@/types/transaction"
import { Receipt } from "lucide-react"

type TransactionListProps = {
  transactions: Transaction[]
  isLoading?: boolean
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
  onCreate: () => void
}

export function TransactionList({
  transactions,
  isLoading,
  onEdit,
  onDelete,
  onCreate,
}: TransactionListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={Receipt}
        title="Nenhuma transação encontrada"
        description="Ajuste os filtros ou cadastre uma nova movimentação."
        actionLabel="Nova transação"
        onAction={onCreate}
      />
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">{transaction.title}</p>
              <Badge
                variant={
                  transaction.type === "income" ? "default" : "destructive"
                }
              >
                {transaction.type === "income" ? "Receita" : "Despesa"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDate(transaction.createdAt)}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <p
              className={
                transaction.type === "income"
                  ? "font-semibold text-emerald-600"
                  : "font-semibold text-rose-600"
              }
            >
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit(transaction)}
                aria-label="Editar transação"
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDelete(transaction)}
                aria-label="Excluir transação"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
