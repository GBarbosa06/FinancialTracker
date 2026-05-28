import { api } from "@/services/api"
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth"

export async function loginRequest(payload: LoginPayload) {
  const { data } = await api.post<AuthResponse>("/auth/login", payload)
  return data
}

export async function registerRequest(payload: RegisterPayload) {
  const { data } = await api.post("/auth/register", payload)
  return data
}

export async function getProfileRequest() {
  const { data } = await api.get<{ userId: string; message: string }>(
    "/users/profile",
  )
  return data
}
