import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { GetMealUseCase } from './get-meal'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let mealsRepository: InMemoryMealsRepository
let sut: GetMealUseCase

describe('Fetch User Meals History Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealUseCase(mealsRepository)
  })

  it('should be able to get meal', async () => {
    const userId = 'user-01'

    const createdMeal = await mealsRepository.create({
      name: 'Lunch',
      description: 'Lunch',
      date: new Date(),
      on_diet: true,
      user_id: userId,
    })

    const { meal } = await sut.execute({
      mealId: createdMeal.id,
      userId,
    })

    expect(meal.id).toEqual(expect.any(String))
  })

  it('should not be able to get inexistent meal', async () => {
    await expect(() =>
      sut.execute({
        mealId: 'inexistent-meal-id',
        userId: 'inexistent-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
