import express from 'express'
import cors from 'cors'
import apiRouter from './routes/apiRouter.js'

const app = express()

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', apiRouter)

// TODO add error handling middleware

app.listen(3000, () => console.log(`Backend listening on port 3000`))
