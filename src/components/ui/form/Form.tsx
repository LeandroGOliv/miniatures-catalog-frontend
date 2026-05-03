import type { ReactNode } from 'react'
import type { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'

export interface UiFormProps<T extends FieldValues> {
  methods: UseFormReturn<T>
  children: ReactNode
  id: string
  onSubmit: (values: T) => void
  onError?: (error: FieldErrors<T>) => void
}

export default function UiForm<T extends FieldValues>({
  methods,
  children,
  id,
  onSubmit,
  onError,
}: UiFormProps<T>) {
  const handleError = (e: FieldErrors<T>) => {
    if (onError) {
      onError(e)
      toast.error('Verifique os erros no formulário e tente novamente')
      return
    }
  }
  return (
    <>
      <Form {...methods}>
        <form
          id={id}
          onSubmit={(e) => {
            return methods.handleSubmit(onSubmit, handleError)(e)
          }}
        >
          {children}
        </form>
      </Form>
    </>
  )
}
