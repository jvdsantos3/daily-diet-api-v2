import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CreateMealUseCase } from '../create-meal'

export function makeCreateMealUseCase() {
  const prismaMealsRepository = new PrismaMealsRepository()

  const useCase = new CreateMealUseCase(prismaMealsRepository)

  return useCase
}
