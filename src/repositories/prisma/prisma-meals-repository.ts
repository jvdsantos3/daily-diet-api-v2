import { Meal, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { MealsRepository, MealsResume } from '../meals-repository'

export class PrismaMealsRepository implements MealsRepository {
  async findById(mealId: string, userId: string) {
    const meal = await prisma.meal.findUnique({
      where: {
        id: mealId,
        user_id: userId,
      },
    })

    return meal
  }

  async findManyByUserId(userId: string, page: number) {
    const meals = await prisma.meal.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
      orderBy: [
        {
          date: 'desc',
        },
      ],
    })

    return meals
  }

  async resumeByUserId(userId: string) {
    const resume = await prisma.$queryRaw<MealsResume[]>`
      WITH consecutive_on_diet AS (
          SELECT
              on_diet,
              user_id,
              ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY id) - 
              ROW_NUMBER() OVER (PARTITION BY user_id, on_diet ORDER BY id) AS consecutive_on_diet_true
          FROM
              meals
          WHERE
              user_id = ${userId}
      )
      SELECT
          COUNT(*) AS total_meals,
          SUM(CASE WHEN on_diet = true THEN 1 ELSE 0 END) AS total_meals_on_diet,
          SUM(CASE WHEN on_diet = false THEN 1 ELSE 0 END) AS total_meals_off_diet,
          MAX(consecutive_on_diet_true) AS best_frequency_on_diet
      FROM
          consecutive_on_diet;
    `

    return resume[0]
  }

  async delete(id: string) {
    await prisma.meal.delete({
      where: {
        id,
      },
    })
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = await prisma.meal.create({
      data,
    })

    return meal
  }

  async save(data: Meal) {
    const meal = await prisma.meal.update({
      where: {
        id: data.id,
      },
      data,
    })

    return meal
  }
}
