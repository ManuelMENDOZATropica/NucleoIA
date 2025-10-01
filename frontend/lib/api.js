import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export async function fetcher (endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await axios({
    url,
    method: options.method || 'GET',
    data: options.body,
    withCredentials: true
  })
  return response.data
}
