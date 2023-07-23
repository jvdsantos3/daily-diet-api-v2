import { MealsRepository } from '@/repositories/meals-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  totalMeals: number
  totalMealsOnDiet: number
  totalMealsOffDiet: number
  bestFrequencyOnDiet: number
}

export class GetUserMetricsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const {
      total_meals,
      total_meals_on_diet,
      total_meals_off_diet,
      best_frequency_on_diet,
    } = await this.mealsRepository.resumeByUserId(userId)

    return {
      totalMeals: Number(total_meals),
      totalMealsOnDiet: Number(total_meals_on_diet),
      totalMealsOffDiet: Number(total_meals_off_diet),
      bestFrequencyOnDiet: Number(best_frequency_on_diet),
    }
  }
}
