import { Meal, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { MealsRepository } from '../meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async findById(mealId: string, userId: string) {
    const meal = this.items.find(
      (item) => item.id === mealId && item.user_id === userId,
    )

    if (!meal) {
      return null
    }

    return meal
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async resumeByUserId(userId: string) {
    const meals = this.items.filter((item) => item.user_id === userId)

    const totalMeals = meals.length
    let totalMealsOnDiet = 0
    let totalMealsOffDiet = 0
    let bestFrequencyOnDiet = 0
    let currentFrequencyOnDiet = 0

    for (const meal of meals) {
      if (meal.on_diet) {
        totalMealsOnDiet++
        currentFrequencyOnDiet++

        if (currentFrequencyOnDiet > bestFrequencyOnDiet) {
          bestFrequencyOnDiet = currentFrequencyOnDiet
        }
      } else {
        totalMealsOffDiet++
        currentFrequencyOnDiet = 0
      }
    }

    return {
      total_meals: totalMeals,
      total_meals_on_diet: totalMealsOnDiet,
      total_meals_off_diet: totalMealsOffDiet,
      best_frequency_on_diet: bestFrequencyOnDiet,
    }
  }

  async delete(id: string) {
    const mealIndex = this.items.findIndex((item) => item.id === id)

    if (mealIndex >= 0) {
      this.items.splice(mealIndex, 1)
    }
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      date: new Date(data.date),
      on_diet: data.on_diet,
      user_id: data.user_id,
      created_at: new Date(),
    }

    this.items.push(meal)

    return meal
  }

  async save(meal: Meal) {
    const mealIndex = this.items.findIndex((item) => item.id === meal.id)

    if (mealIndex >= 0) {
      this.items[mealIndex] = meal
    }

    return meal
  }
}
