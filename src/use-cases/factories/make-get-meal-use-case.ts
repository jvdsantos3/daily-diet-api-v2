import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { GetMealUseCase } from '../get-meal'

export function makeGetMealUseCase() {
  const prismaMealsRepository = new PrismaMealsRepository()

  const useCase = new GetMealUseCase(prismaMealsRepository)

  return useCase
}
