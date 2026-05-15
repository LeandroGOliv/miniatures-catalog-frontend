import z from 'zod'

export const apiPaginationResponse = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: z.object({
      total: z.number(),
      page: z.number(),
      limit: z.number(),
      totalPages: z.number(),
    }),
  })

export const apiPaginationParams = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
})

export const createQuerySchema = <T extends z.ZodRawShape>(filters: T) =>
  apiPaginationParams.extend(filters)
