import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { fetchMeals } from './fetch-meals'
import { getMeal } from './get-meal'
import { edit } from './edit'
import { deleteMeal } from './delete'
import { metrics } from './metrics'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/meals', create)
  app.put('/meals/:mealId', edit)
  app.delete('/meals/:mealId', deleteMeal)

  app.get('/meals', fetchMeals)
  app.get('/meals/metrics', metrics)
  app.get('/meals/:mealId', getMeal)
}
