import { BRANDS, CONDITIONS_KEYS } from '#/constants/miniatures/enums'
import z from 'zod'
import { apiPaginationResponse, createQuerySchema } from '../api/api.schema'

export const CreateMiniatureSchema = apiPaginationResponse(
  z.object({
    name: z.string().min(1),
    brand: z.enum(BRANDS),
    description: z.string().min(1),
    price: z.coerce.number().positive(),
    imgUrl: z.string(),
    condition: z.enum(CONDITIONS_KEYS),
  }),
)

export const UpdateMiniatureSchema = CreateMiniatureSchema.partial().extend({
  id: z.number(),
})

export const ResponseMiniatureSchema = CreateMiniatureSchema.extend({
  id: z.number(),
})

export const FiltersMiniatureSchema = createQuerySchema({
  name: z.string().optional(),
  brand: z.enum(BRANDS).optional(),
  condition: z.enum(CONDITIONS_KEYS).optional(),
})

export type CreateMiniatureSchema = z.infer<typeof CreateMiniatureSchema>
export type UpdateMiniatureSchema = z.infer<typeof UpdateMiniatureSchema>
export type ResponseMiniatureSchema = z.infer<typeof ResponseMiniatureSchema>
export type FiltersMiniatureSchema = z.infer<typeof FiltersMiniatureSchema>
