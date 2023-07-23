import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { EditMealUseCase } from '../edit-meal'

export function makeEditMealUseCase() {
  const prismaMealsRepository = new PrismaMealsRepository()

  const useCase = new EditMealUseCase(prismaMealsRepository)

  return useCase
}
