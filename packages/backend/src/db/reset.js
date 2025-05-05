import prisma from '../../prisma/client.js'

const resetDB = async (log = false) => {
  if (log) {
    console.log('Resetting database 💣')
  }

  const foundCharacters = await prisma.foundCharacter.count()
  const games = await prisma.game.count()
  const characters = await prisma.character.count()

  if (foundCharacters == 0 && games == 0 && characters == 0) {
    console.log('Database already reset. Skipping reset. 🌲')
    return
  }

  try {
    await prisma.foundCharacter.deleteMany()
    await prisma.game.deleteMany()
    await prisma.character.deleteMany()
    if (log) {
      console.log('Database reset 💥')
    }
  } catch (error) {
    console.error('Error resetting database:', error)
  }
}

export default resetDB
