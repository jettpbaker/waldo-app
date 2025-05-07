import express from 'express'
import cors from 'cors'
import apiRouter from './routes/apiRouter.js'
import DB from './db/db.js'
import errorHandler from './middleware/errorHandler.js'

console.log(process.env.NODE_ENV)

const app = express()

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

DB.helpers.seedDB(true)

// Add artificial delay for development/testing
app.use('/', (req, res, next) => {
  setTimeout(next, 1000)
})

app.use('/api', apiRouter)

// TODO add error handling middleware
app.use(errorHandler)

app.listen(3000, () => console.log(`Backend listening on port 3000`))
