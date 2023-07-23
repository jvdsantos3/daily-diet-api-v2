import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { DeleteMealUseCase } from '../delete-meal'

export function makeDeleteMealUseCase() {
  const prismaMealsRepository = new PrismaMealsRepository()

  const useCase = new DeleteMealUseCase(prismaMealsRepository)

  return useCase
}
