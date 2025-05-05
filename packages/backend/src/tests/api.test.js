import { describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'
import DB from '../db/db'
import apiRouter from '../routes/apiRouter'
import errorHandler from '../middleware/errorHandler'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', apiRouter)
app.use(errorHandler)

beforeEach(async () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('NODE_ENV is not set to test')
  }
  await DB.helpers.resetDB()
  await DB.helpers.seedDB()
})

describe('Game operations endpoints', () => {
  it('should start a new game', async () => {
    const response = await request(app).post('/api/start_game')
    expect(response.status).toBe(200)
    expect(response.body.id).toBeDefined()
    expect(response.body.start_time).toBeDefined()
    expect(response.body.end_time).toBeNull()
    expect(response.body.player_name).toBeNull()
    expect(response.body.completed).toBe(false)
  })

  it('should end a game', async () => {
    const game = await request(app).post('/api/start_game')
    const { id } = game.body

    const response = await request(app).patch(`/api/end_game/${id}`).send({
      playerName: 'John Doe',
    })

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(id)
    expect(response.body.start_time).toBeDefined()
    expect(new Date(response.body.end_time).getTime()).toBeGreaterThan(
      new Date(response.body.start_time).getTime()
    )
    expect(response.body.player_name).toBe('John Doe')
    expect(response.body.completed).toBe(true)
  })

  it('should not end a game that does not exist', async () => {
    const response = await request(app).patch('/api/end_game/0').send({
      playerName: 'John Doe',
    })
    expect(response.status).toBe(404)
  })

  it('should not end a game that is already ended', async () => {
    const game = await request(app).post('/api/start_game')
    const { id } = game.body

    await request(app).patch(`/api/end_game/${id}`).send({
      playerName: 'John Doe',
    })

    const response = await request(app).patch(`/api/end_game/${id}`).send({
      playerName: 'John Doe',
    })
    expect(response.status).toBe(409)
  })

  it('should throw 404 if no completed games are found', async () => {
    const response = await request(app).get('/games')
    expect(response.status).toBe(404)
  })

  it('should return all completed games, sorted newest to oldest', async () => {
    const game1 = await request(app).post('/api/start_game')
    await new Promise((resolve) => setTimeout(resolve, 5))
    await request(app).patch(`/api/end_game/${game1.body.id}`).send({
      playerName: 'Player 1',
    })

    const game2 = await request(app).post('/api/start_game')
    await request(app).patch(`/api/end_game/${game2.body.id}`).send({
      playerName: 'Player 2',
    })

    const game3 = await request(app).post('/api/start_game')
    await new Promise((resolve) => setTimeout(resolve, 10))
    await request(app).patch(`/api/end_game/${game3.body.id}`).send({
      playerName: 'Player 3',
    })

    const response = await request(app).get('/api/games')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(3)
    expect(response.body[0].duration).toBeLessThan(response.body[1].duration)
    expect(response.body[1].duration).toBeLessThan(response.body[2].duration)
  })
})

describe('Character operations endpoint', () => {
  it('should return all characters', async () => {
    const response = await request(app).get('/api/characters')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(3)
  })
})

describe('Check endpoint', () => {
  it('should check if game is completed', async () => {
    const game = await request(app).post('/api/start_game')
    const { id } = game.body

    // Find Waldo
    await request(app).post('/api/check').send({
      x: 0.24,
      y: 0.7,
      gameId: id,
    })
    // Find Wizard
    await request(app).post('/api/check').send({
      x: 0.45,
      y: 0.074,
      gameId: id,
    })
    // Find Odlaw
    await request(app).post('/api/check').send({
      x: 0.058,
      y: 0.734,
      gameId: id,
    })
    // Find Waldo again
    const response = await request(app).post('/api/check').send({
      x: 0.24,
      y: 0.7,
      gameId: id,
    })

    expect(response.status).toBe(409)
    expect(response.body.message).toBe('Game already completed')
  })

  it('should check if a character is already found', async () => {
    const game = await request(app).post('/api/start_game')
    const { id } = game.body

    // Find Waldo
    await request(app).post('/api/check').send({
      x: 0.24,
      y: 0.7,
      gameId: id,
    })

    const response = await request(app).post('/api/check').send({
      x: 0.24,
      y: 0.7,
      gameId: id,
    })

    expect(response.status).toBe(409)
    expect(response.body.message).toBe('Character already found')
  })

  it('should check if the x and y are in the correct range', async () => {
    const game = await request(app).post('/api/start_game')
    const { id } = game.body

    const response = await request(app).post('/api/check').send({
      x: 0.8,
      y: 0.7,
      gameId: id,
    })

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Character not found')
  })

  it('returns the character if found', async () => {
    const game = await request(app).post('/api/start_game')
    const { id } = game.body

    // Find Waldo
    const response = await request(app).post('/api/check').send({
      x: 0.24,
      y: 0.7,
      gameId: id,
    })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Character found')
    expect(response.body.character.name).toBe('Waldo')
  })

  it('ends the game if all characters are found', async () => {
    const game = await request(app).post('/api/start_game')
    const { id } = game.body

    // Find Wizard
    await request(app).post('/api/check').send({
      x: 0.45,
      y: 0.074,
      gameId: id,
    })
    // Find Odlaw
    await request(app).post('/api/check').send({
      x: 0.058,
      y: 0.734,
      gameId: id,
    })
    // Find Waldo
    const response = await request(app).post('/api/check').send({
      x: 0.24,
      y: 0.7,
      gameId: id,
    })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Game completed')
  })
})
