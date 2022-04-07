import axios from 'axios'
const instance = axios.create({
  baseURL: process.env.baseURL,
  headers: { 'X-Custom-Header': 'foobar' }
})

export default instance
