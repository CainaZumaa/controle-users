// @ts-ignore
import dotenv from "dotenv";
dotenv.config();

// @ts-ignore
import Knex from "knex";

const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD, NODE_ENV } =
  process.env;

const config = {
  development: {
    client: "postgresql",
    connection: {
      host: DB_HOST,
      port: parseInt(DB_PORT),
      database: DB_DATABASE,
      user: DB_USER,
      password: String(DB_PASSWORD),
    },
    migrations: {
      directory: "./src/knex/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./src/knex/seeds",
    },
  },
};

export const database = Knex(config[NODE_ENV || "development"]);
export default config;
