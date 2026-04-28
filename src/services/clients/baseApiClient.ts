import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export const baseApiClient = () =>
  axios.create({
    baseURL: '/api',
    paramsSerializer: {
      indexes: null,
    },
  })

export interface DataApiClient extends AxiosInstance {
  get: <T = undefined>(url: string, config?: AxiosRequestConfig) => Promise<T>
  post: <T = undefined, TData = any>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig,
  ) => Promise<T>
  put: <T = undefined, TData = any>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig,
  ) => Promise<T>
  delete: <T = undefined>(
    url: string,
    config?: AxiosRequestConfig,
  ) => Promise<T>
  patch: <T = undefined, TData = any>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig,
  ) => Promise<T>
  request: <T>(config: AxiosRequestConfig) => Promise<T>
}
