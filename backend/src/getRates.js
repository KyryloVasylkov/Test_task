import CoinMarketCap from 'coinmarketcap-api'

const COINMARKETCAP_TOKEN = '12ce1ac1-c927-44f5-8cd7-cb42a447e100'

export async function getRates(req, res) {
  let { symbol } = req.query

  if (!symbol) {
    res.status(400).json({ error: 'No symbol provided' })
    return
  }

  const client = new CoinMarketCap(COINMARKETCAP_TOKEN)
  const inUsd = await client.getQuotes({ symbol, convert: 'USD' })

  const rates = {}

  for (const [key, value] of Object.entries(inUsd.data)) {
    rates[key] = value.quote.USD.price
  }

  rates.UAH = 0.027
  rates.EUR = 1.18
  rates.USD = 1

  console.log('CoinMarketCap курс криптовалют')

  res.json(rates)
}
