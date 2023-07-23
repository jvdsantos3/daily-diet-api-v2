import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Fetch Meals (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch meals', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Lunch',
        description: 'Lunch',
        date: new Date(),
        onDiet: true,
      })

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Dinner',
        description: 'Dinner',
        date: new Date(),
        onDiet: true,
      })

    const response = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.meals).toHaveLength(2)
    expect(response.body.meals).toEqual([
      expect.objectContaining({
        name: 'Dinner',
      }),
      expect.objectContaining({
        name: 'Lunch',
      }),
    ])
  })
})
