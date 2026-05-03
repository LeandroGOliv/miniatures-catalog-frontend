import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginRequestSchema } from '#/schemas/auth/login.schema'
import type { LoginRequestSchema } from '#/schemas/auth/login.schema'
import { useMutation } from '@tanstack/react-query'
import services from '@/services'
import { useAuthStore } from '#/store/authStore'
import { toast } from 'sonner'
import { ApiError } from '#/services/errors'
import UiForm from '#/components/ui/form/Form'
import UiFormField from '#/components/ui/form/FormField'
import { Input } from '@/components/ui/input'
import { Button } from '#/components/ui/button'

export default function LoginForm() {
  const [isPending, setIsPending] = useState(false)
  const { login } = useAuthStore()

  const methods = useForm<LoginRequestSchema>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const { mutate } = useMutation({
    mutationFn: async (form: LoginRequestSchema) => {
      setIsPending(true)
      return services.auth.login(form)
    },
    onSuccess: async (authResponse) => {
      await login(authResponse.user, authResponse.token)
      toast.success('Logado com sucesso!')
    },
    onError: (error: unknown) => {
      setIsPending(false)

      if (ApiError.isApiError(error)) {
        toast.error(error.message)
      } else {
        toast.error('Usuário e/ou senha inválidos.')
      }
    },
  })

  function onFormSubmit(e: LoginRequestSchema) {
    mutate(e)
  }

  return (
    <>
      <UiForm methods={methods} id={'form-login'} onSubmit={onFormSubmit}>
        <UiFormField label="Usuário:" name="username">
          {(field) => (
            <Input {...field} type="text" placeholder="Digite seu usuário" />
          )}
        </UiFormField>
        <UiFormField label="Senha:" name="password">
          {(field) => (
            <Input {...field} type="password" placeholder="Digite sua senha" />
          )}
        </UiFormField>
        <Button type="submit" loading={isPending}>
          Acessar
        </Button>
      </UiForm>
    </>
  )
}
