import { request } from './apiClient'

const URL = import.meta.env.VITE_API_URL

export function getGames() {
  return request(`${URL}/games`)
}
