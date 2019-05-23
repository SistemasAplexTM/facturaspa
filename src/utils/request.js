import axios from 'axios'
import { getToken } from '@/utils/auth'
// Creación de la intancia de Axios
const service = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API, // api base_url
  timeout: 50000, // Tiempo máximo de espera para una solicitud ajax
  headers: {
    'Authorization': 'Bearer ' + getToken(),
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export default service
