import express from 'express'
import cors from 'cors'
import db from './config/database.js'
import apiRouter, { apiErrorHandler } from './routes/api.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
])

app.use(cors({
  origin(origin, callback) {
    callback(null, !origin || allowedOrigins.has(origin))
  },
}))
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
  console.log(`OctoFit API base URL: ${baseUrl}`)
})