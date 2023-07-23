import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const prismaMealsRepository = new PrismaMealsRepository()

  const useCase = new GetUserMetricsUseCase(prismaMealsRepository)

  return useCase
}
