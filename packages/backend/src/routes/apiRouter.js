import express from 'express'
import apiController from '../controllers/apiController'

const apiRouter = express.Router()

apiRouter.get('/games', apiController.getGames)
apiRouter.get('/characters', apiController.getCharacters)

apiRouter.post('/start_game', apiController.startGame)
apiRouter.patch('/end_game/:id', apiController.endGame)
apiRouter.post('/check', apiController.check)

apiRouter.get('/ping', (req, res) => {
  res.json({ message: 'pong' })
})

export default apiRouter
