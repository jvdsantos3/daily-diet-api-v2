import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditMealUseCaseRequest {
  mealId: string
  userId: string
  name: string
  description: string
  date: Date
  onDiet: boolean
}

interface EditMealUseCaseResponse {
  meal: Meal
}

export class EditMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    mealId,
    userId,
    name,
    description,
    date,
    onDiet,
  }: EditMealUseCaseRequest): Promise<EditMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId, userId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    meal.name = name
    meal.description = description
    meal.date = date
    meal.on_diet = onDiet

    await this.mealsRepository.save(meal)

    return {
      meal,
    }
  }
}
