import { createApiError } from '../errors'
import { baseApiClient } from './baseApiClient'

const publicApiClient = baseApiClient()

publicApiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const apiError = createApiError(error)
    return Promise.reject(apiError)
  },
)

export default publicApiClient
