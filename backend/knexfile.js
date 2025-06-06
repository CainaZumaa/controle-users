// @ts-ignore
import dotenv from "dotenv";
dotenv.config();

const config = {
  development: {
    client: "postgresql",
    debug: true,
    connection: process.env.DATABASE_URL,
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
};

export default config;
