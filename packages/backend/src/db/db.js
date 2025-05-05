import prisma from '../../prisma/client.js'
import seedDB from './seed.js'
import resetDB from './reset.js'

const DB = {
  queries: {
    getCompletedGames: async () => {
      const games = await prisma.game.findMany({
        where: {
          completed: true,
        },
      })
      return games
    },

    getCharacters: async () => {
      const characters = await prisma.character.findMany()
      return characters
    },
  },

  mutations: {
    startGame: async () => {
      const game = await prisma.game.create()
      return game
    },

    endGame: async (id) => {
      await prisma.game.update({
        where: {
          id,
        },
        data: {
          end_time: new Date(),
          completed: true,
        },
      })
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
