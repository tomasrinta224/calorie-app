import knex from "knex";

export default knex({
  client: "pg",
  debug: true,
  connection: {
    user: process.env.PG_USER,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
    port: +(process.env.PG_PORT || 5432),
    host: process.env.PG_HOST,
  },
});
