import express from 'express'
import cors from 'cors'
import apiRouter from './routes/api.js'

const app = express()

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
}

app.use('/api', apiRouter)

app.listen(3000, () => console.log(`Backend listening on port 3000`))
