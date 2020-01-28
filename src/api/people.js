import client from '../client'
import Image from './image'

const People = {
  async getAll ({ page = 1 }) {
    const response = await client.get('/people', { params: { page } })
    let items = response.data.results
    items = await Promise.all(items.map(async (item) => {
      const { data } = await Image.getFromGoogle(item.name.toLowerCase())
      item.image = data.items[0].link
      return item
    }))

    response.data.results = items
    return response.data
  }
}

export default People
