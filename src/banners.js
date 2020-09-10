
const { createNewContainer } = require('./utils')

export const makeMoneyWithMemesBanner = (target) => {
  let { container, wrapper } = createNewContainer()
  wrapper.classList.add('partner-cta')
  wrapper.style.maxWidth = '450px'

  wrapper.innerHTML = `
    <img src="https://api.entermeme.com/images/partners/making_money_from_memes.jpg" alt="We pay for memes">
    <div class="partner-cta-coin">
      <img src="https://api.entermeme.com/images/partners/coin.png" width="56">
    </div>
    <div class="my-2"></div>
    <h4 class="partner-cta-prize-heading">
      Win Prizes TODAY From Your Meme!
    </h4>
    <p>Just post your first meme here...</p>
    <div class="partner-cta-prize-heading">
      Too shy to post?
    </div>
    <p>Win prizes by voting, sharing, and commenting too!</p>
    <a class="partner-cta-btn" href="https://api.entermeme.com">
      Make Money With Memes
    </a>
    <hr>
    <a href="https://api.entermeme.com">
      <img class="partner-cta-logo" src="https://entermeme.com/images/logo.png" height="20" alt="Entermeme - Family Friendly Meme Marketplace">
    </a>
  `

  target = document.querySelector(target)
  if (target) {
    target.append(container)
  }
}
