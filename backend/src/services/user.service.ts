import { toCamel } from "../helpers/change-case";
import knex from "../db/knex";

class UserService {
  async findByToken(token: string) {
    const result = await knex("users").where({ token });
    if (!result || result.length === 0) return null;
    return toCamel(result[0]);
  }

  async findById(userId: number) {
    const result = await knex("users").where({ user_id: userId });
    if (!result || result.length === 0) return null;
    return toCamel(result[0]);
  }
}

export default new UserService();
