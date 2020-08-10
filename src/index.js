const { getPrizeOfToday } = require('./api')
const { openShareModal } = require('./shareModal')
const { makeMoneyWithMemesBanner } = require('./banners')

require('./styles/styles.scss')

export default function Entermeme({ token }) {
  if (!token) {
    throw Error('You need to provide your public access token')
  }

  let model = {
    token,
    makeMoneyWithMemesBanner,
    prizeOfToday: {
      avatar: 'https://entermeme.com/storage/prizes/xbLTn7mYO0QeqjE5jfw0TR3yUYckI9RloMOcC70i.jpeg',
      title: '$5 Amazon Digital Giftcard',
    },
    openShareModal(data) {
      let { image } = data || {}

      if (!image) {
        throw Error('You need to provide the uploaded meme')
      }

      openShareModal({
        image,
        token: this.token,
        prize: this.prizeOfToday
      })
    }
  }

  getPrizeOfToday().then(({ prize }) => {
    model.prizeOfToday = prize
  })

  return model
}
