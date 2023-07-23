import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteMealUseCaseRequest {
  mealId: string
  userId: string
}

interface DeleteMealUseCaseResponse {
  meal: Meal
}

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    mealId,
    userId,
  }: DeleteMealUseCaseRequest): Promise<DeleteMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId, userId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    await this.mealsRepository.delete(mealId)

    return {
      meal,
    }
  }
}
