import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"
import type { TransactionSummary } from "@/types/transaction"

type SummaryCardsProps = {
  summary?: TransactionSummary
  isLoading?: boolean
}

export function SummaryCards({ summary, isLoading }: SummaryCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Saldo"
        value={summary?.balance ?? 0}
        icon={Wallet}
        isLoading={isLoading}
      />
      <StatCard
        title="Receitas"
        value={summary?.income ?? 0}
        icon={ArrowUpRight}
        tone="success"
        isLoading={isLoading}
      />
      <StatCard
        title="Despesas"
        value={summary?.expense ?? 0}
        icon={ArrowDownLeft}
        tone="danger"
        isLoading={isLoading}
      />
    </div>
  )
}
