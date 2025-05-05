import prisma from '../../prisma/client.js'
import seedDB from './seed.js'
import resetDB from './reset.js'
import { createApiError } from '../middleware/errorHandler.js'
const DB = {
  queries: {
    getGameById: async (id) => {
      const game = await prisma.game.findUnique({
        where: {
          id,
        },
        include: {
          found_characters: true,
        },
      })
      if (!game) {
        const error = createApiError(404, 'Game not found')
        throw error
      }
      return game
    },

    getCompletedGames: async () => {
      const games = await prisma.game.findMany({
        where: {
          completed: true,
        },
        orderBy: {
          duration: 'asc',
        },
      })

      if (!games) {
        const error = createApiError(404, 'No completed games found')
        throw error
      }
      return games
    },

    getCharacters: async () => {
      const characters = await prisma.character.findMany()
      if (!characters) {
        const error = createApiError(404, 'No characters found')
        throw error
      }
      return characters
    },
  },

  mutations: {
    startGame: async () => {
      const game = await prisma.game.create({
        data: {
          start_time: new Date(),
        },
      })
      return game
    },

    endGame: async (id, playerName) => {
      const game = await prisma.game.findUnique({
        where: {
          id,
        },
      })

      if (!game) {
        const error = createApiError(404, 'Game not found')
        throw error
      }

      if (game.completed) {
        const error = createApiError(409, 'Game already completed')
        throw error
      }

      const now = new Date()
      const duration = now.getTime() - game.start_time.getTime()

      const completedGame = await prisma.game.update({
        where: {
          id,
        },
        data: {
          end_time: now,
          duration,
          completed: true,
          player_name: playerName,
        },
      })
      return completedGame
    },

    addCharacterToGame: async (gameId, characterId) => {
      await prisma.foundCharacter.create({
        data: {
          game_id: gameId,
          character_id: characterId,
        },
      })
    },
  },

  helpers: {
    seedDB,
    resetDB,
  },
}

export default DB
