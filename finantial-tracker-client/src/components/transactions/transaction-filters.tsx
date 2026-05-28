import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { TransactionFilters } from "@/types/transaction"

type TransactionFiltersBarProps = {
  filters: TransactionFilters
  onChange: (filters: TransactionFilters) => void
}

export function TransactionFiltersBar({
  filters,
  onChange,
}: TransactionFiltersBarProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="relative md:col-span-1">
        <Search className="pointer-events-none absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
        <Input
          className="pl-8"
          placeholder="Buscar por título"
          value={filters.search}
          onChange={(event) =>
            onChange({ ...filters, search: event.target.value })
          }
        />
      </div>

      <Select
        value={filters.type}
        onValueChange={(value) =>
          onChange({
            ...filters,
            type: value as TransactionFilters["type"],
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os tipos</SelectItem>
          <SelectItem value="income">Receitas</SelectItem>
          <SelectItem value="expense">Despesas</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.period}
        onValueChange={(value) =>
          onChange({
            ...filters,
            period: value as TransactionFilters["period"],
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todo período</SelectItem>
          <SelectItem value="7d">Últimos 7 dias</SelectItem>
          <SelectItem value="30d">Últimos 30 dias</SelectItem>
          <SelectItem value="90d">Últimos 90 dias</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
