import { Meal, Prisma } from '@prisma/client'

export interface MealsResume {
  total_meals: number
  total_meals_on_diet: number
  total_meals_off_diet: number
  best_frequency_on_diet: number
}

export interface MealsRepository {
  findById(mealId: string, userId: string): Promise<Meal | null>
  findManyByUserId(userId: string, page: number): Promise<Meal[]>
  resumeByUserId(userId: string): Promise<MealsResume>
  delete(id: string): Promise<void>
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  save(meal: Meal): Promise<Meal>
}
