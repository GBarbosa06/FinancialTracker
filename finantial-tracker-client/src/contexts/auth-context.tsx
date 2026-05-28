import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
} from "@/lib/constants"
import { loginRequest } from "@/services/auth.service"
import type { LoginPayload, User } from "@/types/auth"

type AuthContextValue = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (payload: LoginPayload) => Promise<void>
  signOut: () => void
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredUser(): User | null {
  const raw = localStorage.getItem(USER_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)
    const storedUser = readStoredUser()

    if (token && storedUser) {
      setUserState(storedUser)
    }

    setIsLoading(false)
  }, [])

  const setUser = useCallback((nextUser: User) => {
    setUserState(nextUser)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser))
  }, [])

  const signIn = useCallback(async (payload: LoginPayload) => {
    const data = await loginRequest(payload)
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user))
    setUserState(data.user)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    setUserState(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user && localStorage.getItem(TOKEN_STORAGE_KEY)),
      signIn,
      signOut,
      setUser,
    }),
    [user, isLoading, signIn, signOut, setUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }

  return context
}
