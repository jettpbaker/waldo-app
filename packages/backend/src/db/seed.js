import prisma from '../../prisma/client.js'

const seedDB = async (log = false) => {
  if (log) {
    console.log('Seeding database 🌱')
  }

  const characters = [
    {
      name: 'Waldo',
      minX: 0.2366,
      minY: 0.6771,
      maxX: 0.251,
      maxY: 0.7139,
    },
    {
      name: 'Wizard',
      minX: 0.4483,
      minY: 0.0732,
      maxX: 0.4609,
      maxY: 0.0944,
    },
    {
      name: 'Odlaw',
      minX: 0.0579,
      minY: 0.7338,
      maxX: 0.0759,
      maxY: 0.7749,
    },
  ]

  try {
    const existingCharacterCount = await prisma.character.count()
    if (existingCharacterCount > 0) {
      console.log('Database already seeded. Skipping seeding. 🌲')
      return
    }

    const seed = await prisma.character.createMany({
      data: characters.map((character) => ({
        name: character.name,
        min_x: character.minX,
        min_y: character.minY,
        max_x: character.maxX,
        max_y: character.maxY,
      })),
    })

    if (log) {
      console.log('Database seeded successfully 🌲')
    }
  } catch (error) {
    console.error('Error seeding database:', error)
    return
  }
}

export default seedDB
