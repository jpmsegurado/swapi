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
  async search ({ page = 1, search }) {
    const response = await client.get('/people', { params: { page, search } })
    response.data.results = response.data.results.map((item) => {
      item.image = 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Star_Wars_Logo_2.svg'
      return item
    })
    return response.data
  }
}

export default People
