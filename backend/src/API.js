import fs from 'fs'
import path from 'path'
import express from 'express'
import cors from 'cors'
import https from 'https'

import { getRates } from './getRates.js'

const PORT = 3131

const isDev = process.env.NODE_ENV === 'development'

const API_ROOT = 'https://rates.ton.beauty'

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.json({ status: 'Online', port: PORT })
})

app.get('/getRates', getRates)

if (isDev) {
  app.listen(PORT, () => {
    console.log(`API Server running locally at http://localhost:${PORT}...`)
  })
} else {
  const options = {
    key: fs.readFileSync(path.join(process.cwd(), './ssl/privkey.pem')),
    cert: fs.readFileSync(path.join(process.cwd(), './ssl/fullchain.pem'))
  }

  const server = https.createServer(options, app)

  server.listen(PORT, () => {
    console.log(`API Server running at ${API_ROOT} on port ${PORT}...`)
  })
}