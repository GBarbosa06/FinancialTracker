import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  buildExpenseCategoryData,
  buildMonthlyChartData,
} from "@/lib/transactions"
import type { Transaction } from "@/types/transaction"

const COLORS = ["#059669", "#2563eb", "#7c3aed", "#ea580c", "#e11d48", "#0f766e"]

type FinanceChartsProps = {
  transactions?: Transaction[]
  isLoading?: boolean
}

export function FinanceCharts({
  transactions = [],
  isLoading,
}: FinanceChartsProps) {
  const monthlyData = buildMonthlyChartData(transactions)
  const expenseData = buildExpenseCategoryData(transactions)
  const evolutionData = monthlyData.map((item) => ({
    month: item.month,
    saldo: item.income - item.expense,
  }))

  if (isLoading) {
    return (
      <div className="grid gap-4 xl:grid-cols-3">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    )
  }

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Evolução mensal</CardTitle>
          <CardDescription>Receitas e despesas por mês</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" name="Receitas" fill="#059669" radius={4} />
              <Bar dataKey="expense" name="Despesas" fill="#e11d48" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Despesas por título</CardTitle>
          <CardDescription>Principais gastos cadastrados</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={90}
              >
                {expenseData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="xl:col-span-3">
        <CardHeader>
          <CardTitle>Saldo acumulado</CardTitle>
          <CardDescription>Evolução financeira ao longo dos meses</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="saldo"
                name="Saldo"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
