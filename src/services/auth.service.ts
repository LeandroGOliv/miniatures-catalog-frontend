import type {
  LoginRequestSchema,
  LoginResponseSchema,
} from '#/schemas/auth/login.schema'
import publicApiClient from './clients/publicApiClient'

export const authService = {
  login: (body: LoginRequestSchema) =>
    publicApiClient.post<LoginResponseSchema>('auth/login', body),
}
