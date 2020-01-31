import client from '../client'
import mock from './mock'
import Image from './image'
const json = localStorage.getItem('people')
const cache = json ? JSON.parse(json) : {}

const People = {
  async getAll ({ page = 1, search }) {
    const params = { page }
    if (search) { params.search = search }

    if (cache[JSON.stringify(params)]) { return Promise.resolve(cache[JSON.stringify(params)]) }

    try {
      const response = await client.get('/people', { params })
      let items = response.data.results
      items = await Promise.all(items.map(async (item) => {
        try {
          const { data } = await Image.getFromGoogle(item.name.toLowerCase())
          item.image = data.items[0].link
        } catch (e) {
          item.image = 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Star_Wars_Logo_2.svg'
        }

        const id = parseInt(item.url.match(/[0-9]{1,5}/))
        item.id = id
        return item
      }))

      response.data.results = items
      cache[JSON.stringify(params)] = response.data
      localStorage.setItem('people', JSON.stringify(cache))
      return response.data
    } catch (e) {
      return mock
    }
  },
  async get (id) {
    const json = localStorage.getItem(`person/${id}`)
    if (json) { return JSON.parse(json) }

    const response = await client.get(`/people/${id}`)
    const item = response.data

    try {
      const { data } = await Image.getFromGoogle(item.name.toLowerCase())
      item.image = data.items[0].link
    } catch (e) {
      item.image = 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Star_Wars_Logo_2.svg'
    }

    item.id = parseInt(id)

    localStorage.setItem(`person/${id}`, JSON.stringify(item))

    return item
  }
}

export default People
