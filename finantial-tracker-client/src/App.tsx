import { AppRouter } from "@/routes"
import { Toaster } from "@/components/ui/sonner"

export default function App() {
  return (
    <>
      <AppRouter />
      <Toaster richColors closeButton position="top-right" />
    </>
  )
}
