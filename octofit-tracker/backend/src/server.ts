import express from 'express'
import db from './config/database.js'
import apiRouter, { apiErrorHandler } from './routes/api.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(express.json())
app.use('/api', apiRouter)

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: db.readyState === 1 ? 'connected' : 'disconnected',
  })
})

app.use(apiErrorHandler)

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`)
})