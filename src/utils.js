
/**
 * We do this work around to make sure
 * the user referral id is not missing when redirected to our website
 *
 */
export const redirectTo = (url) => {
  const form = document.createElement('form')

  let params = []
  let action = url
  let qmIndex = url.indexOf('?')
  if (qmIndex >= 0) {
    action = url.substr(0, qmIndex)
    params = url.substr(qmIndex + 1)
    .split('&')
    .map((item) => item.split('='))
    .filter(([name, value]) => !!name && !!value)
  }

  form.setAttribute('method', 'GET')
  form.setAttribute('action', action)

  params.forEach(([name, value]) => {
    let input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', name)
    input.setAttribute('value', decodeURIComponent(value))
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
}
