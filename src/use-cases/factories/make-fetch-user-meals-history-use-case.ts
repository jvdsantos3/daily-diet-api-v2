import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { FetchUserMealsHistoryUseCase } from '../fetch-user-meals-history'

export function makeFetchUserMealsHistoryUseCase() {
  const prismaMealsRepository = new PrismaMealsRepository()

  const useCase = new FetchUserMealsHistoryUseCase(prismaMealsRepository)

  return useCase
}
