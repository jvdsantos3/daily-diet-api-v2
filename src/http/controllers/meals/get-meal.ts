import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetMealUseCase } from '@/use-cases/factories/make-get-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getMeal(request: FastifyRequest, reply: FastifyReply) {
  const getMealParamsSchema = z.object({
    mealId: z.coerce.string().uuid(),
  })

  const { mealId } = getMealParamsSchema.parse(request.params)

  const userId = request.user.sub

  try {
    const getMealUseCase = makeGetMealUseCase()

    const { meal } = await getMealUseCase.execute({
      mealId,
      userId,
    })

    return reply.status(200).send({
      meal,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: err.message,
      })
    }
  }
}
