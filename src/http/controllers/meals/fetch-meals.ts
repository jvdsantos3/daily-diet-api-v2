import { makeFetchUserMealsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-meals-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchMeals(request: FastifyRequest, reply: FastifyReply) {
  const mealsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = mealsHistoryQuerySchema.parse(request.query)

  const userId = request.user.sub

  const fetchUserMealsUseCase = makeFetchUserMealsHistoryUseCase()

  const { meals } = await fetchUserMealsUseCase.execute({
    userId,
    page,
  })

  return reply.status(200).send({
    meals,
  })
}
