import { Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

type AppHeaderProps = {
  title: string
  onMenuClick?: () => void
}

export function AppHeader({ title, onMenuClick }: AppHeaderProps) {
  const { user, signOut } = useAuth()

  return (
    <header className="flex items-center justify-between border-b bg-background px-4 py-4 md:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
          aria-label="Abrir menu"
        >
          <Menu className="size-4" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
          {user && (
            <p className="text-sm text-muted-foreground">
              Olá, {user.name.split(" ")[0]}
            </p>
          )}
        </div>
      </div>

      <Button variant="outline" onClick={signOut}>
        <LogOut className="size-4" />
        Sair
      </Button>
    </header>
  )
}
