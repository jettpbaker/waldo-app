import express from 'express'

const apiRouter = express.Router()

apiRouter.get('/games', (req, res) => {
  res.json({ message: 'games' })
})
apiRouter.get('/characters', (req, res) => {
  res.json({ message: 'characters' })
})
apiRouter.get('/check', (req, res) => {
  res.json({ message: 'check' })
})

apiRouter.post('/start_game', (req, res) => {
  res.json({ message: 'start_game' })
})
apiRouter.patch('/end_game/:id', (req, res) => {
  res.json({ message: 'end_game' })
})

apiRouter.get('/ping', (req, res) => {
  res.json({ message: 'pong' })
})

export default apiRouter
