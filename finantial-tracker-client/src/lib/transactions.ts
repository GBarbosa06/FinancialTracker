import type { Transaction, TransactionFilters } from "@/types/transaction"

export function filterTransactions(
  transactions: Transaction[],
  filters: TransactionFilters,
) {
  const now = Date.now()

  return transactions.filter((transaction) => {
    if (filters.type !== "all" && transaction.type !== filters.type) {
      return false
    }

    if (filters.search.trim()) {
      const search = filters.search.trim().toLowerCase()
      if (!transaction.title.toLowerCase().includes(search)) {
        return false
      }
    }

    if (filters.period !== "all") {
      const createdAt = new Date(transaction.createdAt).getTime()
      const days =
        filters.period === "7d" ? 7 : filters.period === "30d" ? 30 : 90
      const limit = now - days * 24 * 60 * 60 * 1000
      if (createdAt < limit) {
        return false
      }
    }

    return true
  })
}

export function paginateTransactions<T>(
  items: T[],
  page: number,
  pageSize: number,
) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize

  return {
    items: items.slice(start, start + pageSize),
    totalPages,
    currentPage,
    totalItems: items.length,
  }
}

export function buildMonthlyChartData(transactions: Transaction[]) {
  const months = new Map<string, { month: string; income: number; expense: number }>()

  for (const transaction of transactions) {
    const date = new Date(transaction.createdAt)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    const label = date.toLocaleDateString("pt-BR", {
      month: "short",
      year: "2-digit",
    })

    const current = months.get(key) ?? { month: label, income: 0, expense: 0 }

    if (transaction.type === "income") {
      current.income += transaction.amount
    } else {
      current.expense += transaction.amount
    }

    months.set(key, current)
  }

  return Array.from(months.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([, value]) => value)
}

export function buildExpenseCategoryData(transactions: Transaction[]) {
  const expenses = transactions.filter((item) => item.type === "expense")
  const grouped = new Map<string, number>()

  for (const expense of expenses) {
    grouped.set(expense.title, (grouped.get(expense.title) ?? 0) + expense.amount)
  }

  return Array.from(grouped.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)
}
