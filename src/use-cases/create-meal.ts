import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'

interface CreateMealUseCaseRequest {
  name: string
  description: string
  date: Date
  onDiet: boolean
  userId: string
}

interface CreateMealUseCaseResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    name,
    description,
    date,
    onDiet,
    userId,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const meal = await this.mealsRepository.create({
      name,
      description,
      date,
      on_diet: onDiet,
      user_id: userId,
    })

    return {
      meal,
    }
  }
}
