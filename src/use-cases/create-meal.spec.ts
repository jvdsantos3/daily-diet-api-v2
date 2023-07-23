import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CreateMealUseCase } from './create-meal'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'

let mealsRepository: InMemoryMealsRepository
let sut: CreateMealUseCase

describe('Create Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(mealsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create meal', async () => {
    vi.setSystemTime(new Date(2023, 6, 20, 8, 0, 0))

    const { meal } = await sut.execute({
      name: 'Lunch',
      description: 'Lunch',
      date: new Date(),
      onDiet: true,
      userId: 'user-01',
    })

    expect(meal.id).toEqual(expect.any(String))
  })
})
