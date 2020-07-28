
const modalClass = 'partners-modal'
const bodyClass = 'partners-modal-open'
const closeButtonClass = 'partners-close-modal'
const modalBackDropClass = 'partners-modal-backdrop'

const { shareMeme } = require('./api')
const { redirectTo } = require('./utils')

export const clearExistingModals = () => {
  document.body.classList.remove(bodyClass)
  Array.from(document.querySelectorAll(`.${modalClass}, .${modalBackDropClass}`), (el) => el.remove())
}

export const createNewModal = ({ prize }) => {
  return new Promise((resolve, reject) => {
    clearExistingModals()

    let modal = document.createElement('div')
    modal.classList.add(modalClass)

    modal.innerHTML = `
      <div class="partners-modal-dialog">
        <div class="partners-modal-content">
          <div class="partners-modal-header">
            <h5 class="partners-modal-title">Congratulations, your meme has been saved!</h5>
            <button class="close-modal-header ${closeButtonClass}" type="button">
              <span>×</span>
            </button>
          </div>
          <div class="partners-modal-body">
            <div class="partner-cta">
              <img
                height="28"
                class="partner-cta-logo"
                src="https://entermeme.com/images/new-ui/logo.png"
                alt="Entermeme - Family Friendly Meme Marketplace" />

              <p class="partner-cta-description">
                <span>Post your meme at</span>
                <a href="https://entermeme.com" target="_blank">entermeme.com</a>
                <span>and</span><br/>
                <strong>WIN DAILY COOL PRIZES!</strong>
              </p>

              <div class="partner-cta-prize">
                <img class="partner-cta-prize-img" src="${prize.avatar}" alt="${prize.title}"/>
                <div class="partner-cta-prize-heading">TODAY'S PRIZE</div>
                <div class="partner-cta-prize-text">${prize.title}</div>
              </div>

              <button class="partner-cta-btn">
                <svg width="22" height="22" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>
                <span class="btn-text">Post Now and earn your first 5 points!</span>
              </button>
            </div>
          </div>
          <div class="partners-modal-footer">
            <button class="close-modal-footer ${closeButtonClass}">Close</button>
          </div>
        </div>
      </div>
    `

    document.body.append(modal)
    document.body.classList.add(bodyClass)

    modal.classList.add('show')

    let overlay = document.createElement('div')
    overlay.classList.add(modalBackDropClass)
    overlay.classList.add('show')
    document.body.append(overlay)

    Array.from(modal.querySelectorAll(`.${closeButtonClass}, .${modalBackDropClass}`), (el) => {
      el.addEventListener('click', () => {
        modal.classList.add('hide')
        overlay.classList.add('hide')
        document.body.classList.remove(bodyClass)
        setTimeout(() => {
          clearExistingModals()
        }, 600)
      })
    })

    let submit = modal.querySelector('.partner-cta-btn')

    resolve({
      modal,
      submit,
    })
  })
}

export const openShareModal = ({ prize, token, image }) => {
  createNewModal({ prize }).then(({ modal, submit }) => {
    submit.addEventListener('click', () => {
      submit.classList.add('loading')
      submit.setAttribute('disabled', true)

      shareMeme({
        image,
        token,
      }).then(({ data }) => {
        redirectTo(data.redirectUrl)
      })
    })
  })
}
