// @ts-nocheck
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";

const swaggerDocument = JSON.parse(readFileSync("./swagger.json", "utf8"));

export { swaggerDocument, swaggerUi };
