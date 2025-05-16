import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const getAuthToken = () => localStorage.getItem('accessToken')
const setAuthToken = (token: string) => localStorage.setItem('accessToken', token)

export function apiClientService(requestConfig: AxiosRequestConfig) {
  const axiosClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
  })

  axiosClient.interceptors.request.use(
    (config) => {
      const token = getAuthToken()
      if (token) {
        config.headers['Authorization'] = token
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  return axiosClient(requestConfig)
}
