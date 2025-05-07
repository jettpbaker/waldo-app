import request from './apiClient.js'

const URL = import.meta.env.VITE_API_URL

function getCharacters() {
  return request(`${URL}/characters`)
}

export default getCharacters
