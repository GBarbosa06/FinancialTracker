import { FinanceCharts } from "@/components/dashboard/finance-charts"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { SummaryCards } from "@/components/dashboard/summary-cards"
import {
  useTransactionSummary,
  useTransactions,
} from "@/hooks/use-transactions"

export function DashboardPage() {
  const transactionsQuery = useTransactions()
  const summaryQuery = useTransactionSummary()

  return (
    <div className="space-y-6">
      <SummaryCards
        summary={summaryQuery.data}
        isLoading={summaryQuery.isLoading}
      />

      <FinanceCharts
        transactions={transactionsQuery.data}
        isLoading={transactionsQuery.isLoading}
      />

      <RecentTransactions
        transactions={transactionsQuery.data}
        isLoading={transactionsQuery.isLoading}
      />
    </div>
  )
}
