import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || ''

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (r) => r,
  (error) => Promise.reject(error?.response?.data || { message: error.message })
)

export default api
