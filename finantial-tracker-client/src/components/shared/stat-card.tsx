import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/format"
import { cn } from "@/lib/utils"

type StatCardProps = {
  title: string
  value: number
  icon: LucideIcon
  tone?: "default" | "success" | "danger"
  isLoading?: boolean
}

export function StatCard({
  title,
  value,
  icon: Icon,
  tone = "default",
  isLoading,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          <p
            className={cn(
              "text-2xl font-semibold",
              tone === "success" && "text-emerald-600",
              tone === "danger" && "text-rose-600",
            )}
          >
            {formatCurrency(value)}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
