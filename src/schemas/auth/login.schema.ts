import z from 'zod'

export const loginRequestSchema = z.object({
  username: z.string().trim().min(1, 'Nome de usuário obrigatório!'),
  password: z.string().trim().min(1, 'Senha obrigatória!'),
})

export type LoginRequestSchema = z.infer<typeof loginRequestSchema>

export const loginResponseSchema = z.object({
  user: z.string(),
  token: z.string(),
})

export type LoginResponseSchema = z.infer<typeof loginResponseSchema>
