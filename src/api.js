const axios = require('axios')
const { baseURL } = require('./config')

const api = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

export const shareMeme = ({ image, token }) => {
  let data = new FormData()
  data.append('image', image)

  return api.post('/partners/memes', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    }
  })
}

export const getPrizeOfToday = () => {
  return new Promise((resolve) => {
    api.get('/json/prize-of-today').then(({ data }) => {
      resolve({ prize: data })
    }).catch(({ response }) => {
      console.log('Error with getting the prize of today!', response)
    })
  })
}
