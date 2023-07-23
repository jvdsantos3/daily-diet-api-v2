import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { EditMealUseCase } from './edit-meal'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let mealsRepository: InMemoryMealsRepository
let sut: EditMealUseCase

describe('Edit Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new EditMealUseCase(mealsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to edit meal', async () => {
    vi.setSystemTime(new Date(2023, 6, 21, 12, 0, 0))

    const userId = 'user-01'

    const beforeEditMeal = await mealsRepository.create({
      name: 'Lunch',
      description: 'Lunch',
      date: new Date(),
      on_diet: true,
      user_id: userId,
    })

    const { meal } = await sut.execute({
      mealId: beforeEditMeal.id,
      userId,
      name: 'Dinner',
      description: 'Dinner',
      date: new Date(),
      onDiet: true,
    })

    expect(meal.id).toEqual(beforeEditMeal.id)
    expect(meal).toEqual(
      expect.objectContaining({ name: 'Dinner', description: 'Dinner' }),
    )
  })

  it('should not be able to edit inexistent meal', async () => {
    await expect(() =>
      sut.execute({
        mealId: 'inexistent-meal-id',
        userId: 'user-01',
        name: 'Dinner',
        description: 'Dinner',
        date: new Date(),
        onDiet: true,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
