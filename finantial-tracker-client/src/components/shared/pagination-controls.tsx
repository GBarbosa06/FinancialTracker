import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type PaginationControlsProps = {
  page: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
}

export function PaginationControls({
  page,
  totalPages,
  totalItems,
  onPageChange,
}: PaginationControlsProps) {
  if (totalItems === 0) return null

  return (
    <div className="flex items-center justify-between gap-3 pt-4">
      <p className="text-sm text-muted-foreground">
        Página {page} de {totalPages} · {totalItems} itens
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Página anterior"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Próxima página"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
