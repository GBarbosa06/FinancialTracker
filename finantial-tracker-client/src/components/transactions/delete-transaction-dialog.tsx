import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useTransactionMutations } from "@/hooks/use-transactions"
import { getErrorMessage } from "@/lib/format"
import type { Transaction } from "@/types/transaction"

type DeleteTransactionDialogProps = {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteTransactionDialog({
  transaction,
  open,
  onOpenChange,
}: DeleteTransactionDialogProps) {
  const { deleteMutation } = useTransactionMutations()

  async function handleDelete() {
    if (!transaction) return

    try {
      await deleteMutation.mutateAsync(transaction.id)
      toast.success("Transação removida com sucesso")
      onOpenChange(false)
    } catch (error) {
      toast.error(getErrorMessage(error, "Não foi possível excluir a transação"))
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir transação?</AlertDialogTitle>
          <AlertDialogDescription>
            A movimentação &quot;{transaction?.title}&quot; será removida
            permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            {deleteMutation.isPending ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
