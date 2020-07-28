const axios = require('axios')
const { baseURL } = require('./config')

export const shareMeme = ({ image, token }) => {
  let data = new FormData()
  data.append('image', image)

  return axios.post('/partners/memes', data, {
    baseURL,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    }
  })
}

export const getPrizeOfToday = () => {
  return axios.get('/json/prize-of-today', {
    baseURL,
  })
}
