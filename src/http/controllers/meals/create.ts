import { makeCreateMealUseCase } from '@/use-cases/factories/make-create-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    onDiet: z.boolean(),
  })

  const { name, description, date, onDiet } = createMealBodySchema.parse(
    request.body,
  )

  const userId = request.user.sub

  const createMealUseCase = makeCreateMealUseCase()

  await createMealUseCase.execute({
    name,
    description,
    date,
    onDiet,
    userId,
  })

  return reply.status(201).send()
}
