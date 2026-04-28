import { useAuthStore } from '#/store/authStore'
import { createApiError } from '../errors'
import { baseApiClient } from './baseApiClient'

const apiClient = baseApiClient()

apiClient.interceptors.request.use((request) => {
  const access_token = useAuthStore.getState().token
  if (access_token) request.headers.Authorization = `Bearer: ${access_token}`
  return request
})

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const apiError = createApiError(error)

    if (apiError.statusCode === 401) {
      useAuthStore.getState().logout()
    }

    return Promise.reject(apiError)
  },
)

export default apiClient
