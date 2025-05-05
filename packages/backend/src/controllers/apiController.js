import DB from '../db/db.js'
import findCharacterAt from '../utils/findCharacterAt.js'

const apiController = {
  getGames: async (req, res, next) => {
    try {
      const games = await DB.queries.getCompletedGames()
      res.status(200).json(games)
    } catch (error) {
      next(error)
    }
  },

  startGame: async (req, res, next) => {
    try {
      const game = await DB.mutations.startGame()
      res.status(200).json(game)
    } catch (error) {
      next(error)
    }
  },

  endGame: async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const { playerName } = req.body
      const game = await DB.mutations.endGame(id, playerName)
      res.status(200).json(game)
    } catch (error) {
      next(error)
    }
  },

  getCharacters: async (req, res, next) => {
    try {
      const characters = await DB.queries.getCharacters()
      res.status(200).json(characters)
    } catch (error) {
      next(error)
    }
  },

  check: async (req, res, next) => {
    try {
      const { x, y, gameId } = req.body
      const game = await DB.queries.getGameById(gameId)
      const character = await findCharacterAt(x, y)

      if (!character) {
        return res.status(404).json({ message: 'Character not found' })
      }

      const foundCharacters = game.found_characters
      if (foundCharacters.length >= 3) {
        return res.status(409).json({ message: 'Game already completed' })
      }

      const foundCharacter = foundCharacters.find((c) => c.character_id === character.id)
      if (foundCharacter) {
        return res.status(409).json({ message: 'Character already found' })
      }

      await DB.mutations.addCharacterToGame(gameId, character.id)
      const updatedGame = await DB.queries.getGameById(gameId)
      if (updatedGame.found_characters.length === 3) {
        return res.status(200).json({ message: 'Game completed', foundCharacter })
      }

      return res.status(200).json({ message: 'Character found', character })
    } catch (error) {
      next(error)
    }
  },
}
export default apiController
