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

    console.log(items)

    return { results: items }
  }
}

export default People
