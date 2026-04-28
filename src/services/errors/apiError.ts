import type { AxiosError } from 'axios'

/**
 * Erro padronizado da API.
 *
 * Abstrai AxiosError e garante estrutura consistente em toda a aplicação.
 * Elimina necessidade de importar AxiosError ou lidar com `.response?.data?.message`.
 */
export class ApiError extends Error {
  /**
   * @param statusCode - Código HTTP da resposta (ex: 401, 404, 500)
   * @param message - Mensagem de erro (do backend ou fallback)
   * @param data - Dados da resposta de erro (opcional, contém informações adicionais)
   */
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly data?: ApiDefaultError,
  ) {
    super(message)
    this.name = 'ApiError'
    Object.setPrototypeOf(this, ApiError.prototype)
  }

  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError
  }
}

export function createApiError(error: unknown): ApiError {
  // Se já é ApiError, retorna diretamente
  if (ApiError.isApiError(error)) {
    return error
  }

  // Cast para AxiosError (se não for, terá propriedades undefined)
  const axiosError = error as
    | AxiosError<ApiDefaultError | undefined>
    | undefined

  // Extrai status code com fallback para 500
  const statusCode = axiosError?.response?.status ?? 500

  // Extrai mensagem com fallback progressivo
  const message =
    axiosError?.response?.data?.message ??
    axiosError?.message ??
    'Erro desconhecido da API'

  // Extrai dados da resposta de erro
  const data = axiosError?.response?.data

  return new ApiError(statusCode, message, data)
}

export type ApiDefaultError = {
  error: string
  message: string
  path: string
  status: number
  timestamp: string
}
