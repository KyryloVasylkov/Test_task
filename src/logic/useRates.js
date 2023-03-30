import { useMainStore } from './functions.js'

export const supportedCurrencies = ['USD', 'EUR', 'UAH', 'BTC', 'ETH', 'BNB', 'XRP']

const isDev = false // process.env.NODE_ENV === 'development'

export const fetchExchangeRates = async () => {
  const devEndpoint = 'http://localhost:3131'
  const prodEndpoint = 'https://rates.ton.beauty'
  const endpoint = isDev ? devEndpoint : prodEndpoint
  const requestURI = `${endpoint}/getRates`
  const url = `${requestURI}?symbol=${supportedCurrencies.join(',')}`
  const response = await fetch(url, { method: 'GET', mode: 'cors' })
  const data = await response.json()
  return data
}

const currencyNames = {
  'USD': 'Доллар США',
  'EUR': 'Евро',
  'GBP': 'Фунт стерлингов',
  'UAH': 'Гривна',
  'BTC': 'Bitcoin',
  'ETH': 'Ethereum',
  'BNB': 'BNB',
  'XRP': 'Ripple'
}

export const getCurrencyName = (code) => currencyNames[code] || ''

export const updateExchangeRates = async () => {
  const mainStore = useMainStore()
  try {
    const rates = await fetchExchangeRates()
    mainStore.setRates(rates)
  } catch (error) {
    console.error('Failed to update exchange rates:', error)
  }

}