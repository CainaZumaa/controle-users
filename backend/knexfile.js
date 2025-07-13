// @ts-ignore
import dotenv from "dotenv";
dotenv.config();

const config = {
  development: {
    client: "postgresql",
    debug: true,
    connection:
      process.env.DATABASE_URL ||
      "postgresql://localhost:5432/users_management",
    pool: {
      min: 2,
      max: 5,
    },
    migrations: {
      directory: "./src/knex/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./src/knex/seeds",
    },
  },
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/knex/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./src/knex/seeds",
    },
  },
  test: {
    client: "postgresql",
    connection:
      process.env.TEST_DATABASE_URL ||
      "postgresql://localhost:5432/users_management_test",
    pool: {
      min: 1,
      max: 2,
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

export default config;
