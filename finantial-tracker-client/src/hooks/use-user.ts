import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/lib/constants"
import { getProfileRequest } from "@/services/auth.service"
import { useAuth } from "@/contexts/auth-context"

export function useAuthenticatedUser() {
  const { user, isAuthenticated } = useAuth()

  const profileQuery = useQuery({
    queryKey: QUERY_KEYS.user,
    queryFn: getProfileRequest,
    enabled: isAuthenticated,
    retry: false,
  })

  return {
    user,
    profileQuery,
    isAuthenticated,
  }
}
