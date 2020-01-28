import axios from 'axios'

const client = axios.create({
  baseURL: 'https://swapi.co/api/',
  timeout: 10000
})

export default client
