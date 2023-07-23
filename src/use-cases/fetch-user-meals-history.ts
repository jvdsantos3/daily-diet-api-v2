import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'

interface FetchUserMealsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserMealsHistoryUseCaseResponse {
  meals: Meal[]
}

export class FetchUserMealsHistoryUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserMealsHistoryUseCaseRequest): Promise<FetchUserMealsHistoryUseCaseResponse> {
    const meals = await this.mealsRepository.findManyByUserId(userId, page)

    return {
      meals,
    }
  }
}
