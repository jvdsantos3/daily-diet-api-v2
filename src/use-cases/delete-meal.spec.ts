import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { DeleteMealUseCase } from './delete-meal'

let mealsRepository: InMemoryMealsRepository
let sut: DeleteMealUseCase

describe('Delete Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new DeleteMealUseCase(mealsRepository)
  })

  it('should be able to delete meal', async () => {
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

    const deletedMeal = await mealsRepository.findById(meal.id, userId)

    const deletedMealExists = !!deletedMeal

    expect(deletedMealExists).toBe(false)
  })

  it('should not be able to delete inexistent meal', async () => {
    await expect(() =>
      sut.execute({
        mealId: 'inexistent-meal-id',
        userId: 'inexistent-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
