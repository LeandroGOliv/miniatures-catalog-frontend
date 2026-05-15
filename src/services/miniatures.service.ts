import type {
  CreateMiniatureSchema,
  FiltersMiniatureSchema,
  ResponseMiniatureSchema,
  UpdateMiniatureSchema,
} from '#/schemas/miniatures/miniature.schema'
import apiClient from './clients/apiClient'
import publicApiClient from './clients/publicApiClient'

export const miniaturesService = {
  getAll: (params: FiltersMiniatureSchema) => {
    publicApiClient.get<ResponseMiniatureSchema>(`/miniatures`, { params })
  },

  getById: (id: number) => {
    publicApiClient.get<ResponseMiniatureSchema>(`/miniatures/${id}`)
  },

  post: (body: CreateMiniatureSchema) => {
    apiClient.post('/miniatures', body)
  },

  patch: (id: number, body: UpdateMiniatureSchema) => {
    apiClient.patch(`/miniatures/${id}`, body)
  },
}
