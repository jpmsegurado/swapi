import axios from 'axios'

const url = `https://www.googleapis.com/customsearch/v1?cx=${process.env.VUE_APP_GOOGLE_API_CX}&q=luke%20skywalker&key=${process.env.VUE_APP_GOOGLE_API_KEY}&searchType=image`

const Image = {
  getFromGoogle (search) {
    return axios.get(url, { params: { q: search } })
  }
}

export default Image
