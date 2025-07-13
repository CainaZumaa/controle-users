// @ts-nocheck
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerDocument = JSON.parse(
  readFileSync(join(__dirname, "swagger.json"), "utf8")
);

export { swaggerDocument, swaggerUi };
