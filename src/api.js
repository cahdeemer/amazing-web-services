const api = 'https://suitor-front-end-back-end.herokuapp.com'

// You'll need an API key to access the API.
// To get one, visit: https://suitor-front-end-back-end.herokuapp.com/api_key

const apiKey = '0N1CFDk'

const pricingEndpoints = {
  vcpu: '/prices/vcpu',
  ram: '/prices/ram',
  disk: '/prices/disk',
  os: '/prices/os'
}

export const fetchPrices = () => {
  console.log('Lets fetch some VM pricing!')

  let prices = {}

  return Promise.all(Object.keys(pricingEndpoints).map(key => {
    console.log('fetching ', pricingEndpoints[key], '...')

    return fetch(api + pricingEndpoints[key], {
      method: 'GET',
      headers: { 'API-Key': apiKey }
    })
    .then(response => response.json())
    .then(json => { prices[key] = json })
    .catch(error => console.error(error))
  }))
  .then(() => {
    console.log('Prices fetched! ', prices )
    return prices
  })
  .catch(error => console.error(error))
}
