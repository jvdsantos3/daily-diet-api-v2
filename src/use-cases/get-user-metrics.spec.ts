import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let mealsRepository: InMemoryMealsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetUserMetricsUseCase(mealsRepository)
  })

  it('should be able to get user metrics', async () => {
    const userId = 'user-01'

    await mealsRepository.create({
      name: 'Lunch',
      description: 'Lunch',
      date: new Date(),
      on_diet: true,
      user_id: userId,
    })

    await mealsRepository.create({
      name: 'Dinner',
      description: 'Dinner',
      date: new Date(),
      on_diet: false,
      user_id: userId,
    })

    const resume = await sut.execute({
      userId,
    })

    expect(resume).toEqual({
      totalMeals: 2,
      totalMealsOnDiet: 1,
      totalMealsOffDiet: 1,
      bestFrequencyOnDiet: 1,
    })
  })

  it('should be able to get user metrics without meals', async () => {
    const userId = 'user-01'

    const resume = await sut.execute({
      userId,
    })

    expect(resume).toEqual({
      totalMeals: 0,
      totalMealsOnDiet: 0,
      totalMealsOffDiet: 0,
      bestFrequencyOnDiet: 0,
    })
  })
})
