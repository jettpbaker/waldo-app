import { PrismaClient } from '../src/generated/prisma'

const getDatabaseUrl = () => {
  if (process.env.NODE_ENV === 'test') {
    if (!process.env.TEST_DATABASE_URL) {
      throw new Error('TEST_DATABASE_URL is not set in the environment variables for test environment.')
    }
    return process.env.TEST_DATABASE_URL
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in the environment variables.')
  }
  return process.env.DATABASE_URL
}

const databaseUrl = getDatabaseUrl()

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})

export default prisma
