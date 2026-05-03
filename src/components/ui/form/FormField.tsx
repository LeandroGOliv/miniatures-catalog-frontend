import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'

export interface UiFormFieldProps {
  children: (
    field: ControllerRenderProps<FieldValues, string> & {
      id: string
      'aria-invalid': boolean | undefined
    },
  ) => ReactNode
  label: string
  name: string
}

export default function UiFormField({
  children,
  label,
  name,
}: UiFormFieldProps) {
  const { control } = useFormContext()
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            {children({
              ...field,
              id: name,
              'aria-invalid': fieldState.invalid,
            })}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  )
}
