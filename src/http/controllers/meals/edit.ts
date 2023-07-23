import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeEditMealUseCase } from '@/use-cases/factories/make-edit-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editMealParamsSchema = z.object({
    mealId: z.string().uuid(),
  })

  const editMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    onDiet: z.boolean(),
  })

  const { mealId } = editMealParamsSchema.parse(request.params)

  const { name, description, date, onDiet } = editMealBodySchema.parse(
    request.body,
  )

  const userId = request.user.sub

  try {
    const editMealUseCase = makeEditMealUseCase()

    await editMealUseCase.execute({
      mealId,
      userId,
      name,
      description,
      date,
      onDiet,
    })

    return reply.status(200).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: err.message,
      })
    }
  }
}
