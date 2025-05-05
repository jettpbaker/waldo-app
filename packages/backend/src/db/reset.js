import prisma from '../../prisma/client.js'

const resetDB = async () => {
  console.log('Resetting database 💣')
  try {
    await prisma.foundCharacter.deleteMany()
    await prisma.game.deleteMany()
    await prisma.character.deleteMany()
    console.log('Database reset 💥')
  } catch (error) {
    console.error('Error resetting database:', error)
  }
}

export default resetDB
