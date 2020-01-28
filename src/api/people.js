import client from '../client'

const People = {
  async getAll () {
    const response = await client.get('/people')
    return response.data
  }
}

export default People
