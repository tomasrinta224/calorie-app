import { toCamel } from "../helpers/change-case";
import knex from "../db/knex";
import { CreateFoodEntryDto, UpdateFoodEntryDto } from "../dtos/food-entry.dto";
import userService from "./user.service";
import { FoodFilterDto } from "dtos/food-filter.dto";

class FoodEntryService {
  async findOne(foodEntryId: number) {
    const result = await knex("food_entries")
      .where({
        food_entry_id: foodEntryId,
      })
      .returning("*");
    if (!result || result.length === 0) return null;
    return toCamel(result?.[0]);
  }

  async create(createDto: CreateFoodEntryDto) {
    const result = await knex("food_entries")
      .insert({
        user_id: createDto.userId,
        food_name: createDto.foodName,
        calorie: createDto.calorie,
        price: createDto.price,
        took_at: createDto.tookAt,
      })
      .returning("*");
    return toCamel(result?.[0]);
  }

  async getWarningDatesForUser(userId: number) {
    const user = await userService.findById(userId);
    return knex("food_entries")
      .select(knex.raw("DATE(took_at) as date"))
      .groupByRaw("DATE(took_at)")
      .where({ user_id: userId })
      .havingRaw("SUM(calorie) > ?", [user.dailyLimit]);
  }

  async getWarningMonthsForUser(userId: number) {
    return knex("food_entries")
      .select(knex.raw("to_char(took_at, 'YYYY-MM') as month"))
      .groupByRaw("to_char(took_at, 'YYYY-MM')")
      .where({ user_id: userId })
      .havingRaw("SUM(price) > ?", [100000]);
  }

  async getAll(filter: FoodFilterDto) {
    let queryBuilder = knex("food_entries");
    if (filter.userId) {
      queryBuilder = queryBuilder.where("food_entries.user_id", filter.userId);
    }
    if (filter.dateFrom) {
      queryBuilder = queryBuilder.whereRaw("DATE(food_entries.took_at) >= ?", [
        filter.dateFrom,
      ]);
    }
    if (filter.dateTo) {
      queryBuilder = queryBuilder.whereRaw("DATE(food_entries.took_at) <= ?", [
        filter.dateTo,
      ]);
    }

    const result = await queryBuilder
      .select("food_entries.*", "users.username")
      .innerJoin("users", "users.user_id", "food_entries.user_id")
      .orderBy("food_entries.took_at", "desc")
      .orderBy("food_entry_id", "desc");

    return result.map((element) => toCamel(element));
  }

  async delete(foodEntryId: number) {
    const result = await knex("food_entries")
      .where({ food_entry_id: foodEntryId })
      .delete()
      .returning("*");
    return toCamel(result?.[0]);
  }

  async update(updateDto: UpdateFoodEntryDto) {
    const result = await knex("food_entries")
      .update({
        ...(updateDto.foodName && { food_name: updateDto.foodName }),
        ...(updateDto.calorie && { calorie: updateDto.calorie }),
        ...(updateDto.price && { price: updateDto.price }),
        ...(updateDto.tookAt && { took_at: updateDto.tookAt }),
      })
      .where({ food_entry_id: updateDto.foodEntryId })
      .returning("*");

    return toCamel(result?.[0]);
  }

  async getReport() {
    const oneWeekBeforeCount = await knex("food_entries")
      .whereRaw(
        "food_entries.took_at < current_date and took_at >= current_date - interval '7 days'"
      )
      .count("*");

    const twoWeekBeforeCount = await knex("food_entries")
      .whereRaw(
        "took_at < current_date - interval '7 days' AND took_at >= current_date - interval '14 days'"
      )
      .count("*");

    const averageCalories = await knex("users")
      .select(
        knex.raw(
          "SUM(food_entries.calorie) / 7 as daily_average, users.user_id, users.username"
        )
      )
      .leftJoin("food_entries", "users.user_id", "food_entries.user_id")
      .whereRaw(
        "food_entries.took_at < current_date and food_entries.took_at >= current_date - interval '7 days'"
      )
      .groupBy("users.user_id");

    return {
      oneWeekBeforeCount: oneWeekBeforeCount?.[0]?.count || 0,
      twoWeekBeforeCount: twoWeekBeforeCount?.[0]?.count || 0,
      averageCalories: averageCalories.map((calorie) =>
        toCamel({
          daily_average: +calorie.daily_average,
          ...calorie,
        })
      ),
    };
  }
}

export default new FoodEntryService();
