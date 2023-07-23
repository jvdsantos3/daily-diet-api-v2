import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteMealUseCase } from '@/use-cases/factories/make-delete-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const getMealParamsSchema = z.object({
    mealId: z.coerce.string().uuid(),
  })

  const { mealId } = getMealParamsSchema.parse(request.params)

  const userId = request.user.sub

  try {
    const deleteMealUseCase = makeDeleteMealUseCase()

    await deleteMealUseCase.execute({
      mealId,
      userId,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: err.message,
      })
    }
  }
}
