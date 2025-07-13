// @ts-ignore
import knex from "knex";
import config from "./knexfile.js";

const environment = process.env.NODE_ENV || "development";
const knexConfig = config[environment];

if (!knexConfig) {
  throw new Error(
    `Configuration for environment '${environment}' not found in knexfile.js`
  );
}

if (!knexConfig.client) {
  throw new Error(
    `Database client not specified for environment '${environment}'`
  );
}

const db = knex(knexConfig);

export default db;
