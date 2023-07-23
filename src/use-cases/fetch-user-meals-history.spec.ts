import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { FetchUserMealsHistoryUseCase } from './fetch-user-meals-history'

let mealsRepository: InMemoryMealsRepository
let sut: FetchUserMealsHistoryUseCase

describe('Fetch User Meals History Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new FetchUserMealsHistoryUseCase(mealsRepository)
  })

  it('should be able to fetch user meals history', async () => {
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
      on_diet: true,
      user_id: userId,
    })

    const { meals } = await sut.execute({
      userId,
      page: 1,
    })

    expect(meals).toHaveLength(2)
    expect(meals).toEqual([
      expect.objectContaining({ name: 'Lunch' }),
      expect.objectContaining({ name: 'Dinner' }),
    ])
  })

  it('should be able to fetch paginated user meals history', async () => {
    const userId = 'user-01'

    for (let i = 1; i <= 22; i++) {
      await mealsRepository.create({
        name: `Lunch-${i}`,
        description: 'Lunch',
        date: new Date(),
        on_diet: true,
        user_id: userId,
      })
    }

    const { meals } = await sut.execute({
      userId,
      page: 2,
    })

    expect(meals).toHaveLength(2)
    expect(meals).toEqual([
      expect.objectContaining({ name: 'Lunch-21' }),
      expect.objectContaining({ name: 'Lunch-22' }),
    ])
  })
})
