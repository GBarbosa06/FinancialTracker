import { Receipt } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { formatCurrency, formatDate } from "@/lib/format"
import type { Transaction } from "@/types/transaction"

type RecentTransactionsProps = {
  transactions?: Transaction[]
  isLoading?: boolean
}

export function RecentTransactions({
  transactions = [],
  isLoading,
}: RecentTransactionsProps) {
  const recent = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimas transações</CardTitle>
        <CardDescription>As movimentações mais recentes da conta</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="Nenhuma transação ainda"
            description="Cadastre sua primeira movimentação para acompanhar o saldo."
          />
        ) : (
          <div className="space-y-3">
            {recent.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg border px-3 py-3"
              >
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      transaction.type === "income" ? "default" : "destructive"
                    }
                  >
                    {transaction.type === "income" ? "Receita" : "Despesa"}
                  </Badge>
                  <p
                    className={
                      transaction.type === "income"
                        ? "mt-1 text-sm font-semibold text-emerald-600"
                        : "mt-1 text-sm font-semibold text-rose-600"
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
