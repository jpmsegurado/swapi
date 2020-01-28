import axios from 'axios'

const client = axios.create({
  baseURL: 'https://swapi.co/api/'
})

export default client
