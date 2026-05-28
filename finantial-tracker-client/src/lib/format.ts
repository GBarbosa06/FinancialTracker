export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}

export function getErrorMessage(error: unknown, fallback = "Algo deu errado") {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response
    if (response?.data?.message) {
      return translateBackendMessage(response.data.message)
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}

function translateBackendMessage(message: string) {
  const messages: Record<string, string> = {
    ACCOUNT_NOT_FOUND: "Conta não encontrada",
    INCORRECT_PASSWORD: "Senha incorreta",
    USER_ALREADY_EXISTS: "Este e-mail já está cadastrado",
    PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS:
      "A senha deve ter pelo menos 8 caracteres",
    MISSING_REQUIRED_FIELDS: "Preencha todos os campos",
    TRANSACTION_NOT_FOUND: "Transação não encontrada",
  }

  return messages[message] ?? message
}
