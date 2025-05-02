import express from 'express'
import cors from 'cors'

console.log(process.env.FRONTEND_URL)

const app = express()

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
}

app.use(cors(corsOptions))

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' })
})

app.listen(3000, () => console.log(`Backend listening on port 3000`))
