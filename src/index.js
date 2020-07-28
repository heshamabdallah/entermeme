const { getPrizeOfToday } = require('./api')
const { openShareModal } = require('./modal')

require('./styles/styles.scss')

export default function Entermeme({ token }) {
  if (!token) {
    throw Error('You need to provide your public access token')
  }

  return {
    token,
    prizeOfToday: null,
    async openShareModal(data) {
      let { image } = data || {}

      if (!image) {
        throw Error('You need to provide the uploaded meme')
      }

      if (!this.prizeOfToday) {
        let { data } = await getPrizeOfToday()
        this.prizeOfToday = data
      }

      openShareModal({
        image,
        token: this.token,
        prize: this.prizeOfToday
      })
    }
  }
}
