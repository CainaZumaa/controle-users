// @ts-nocheck
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let swaggerDocument;

try {
  swaggerDocument = JSON.parse(
    readFileSync(join(__dirname, "swagger.json"), "utf8")
  );
} catch (error) {
  console.warn(
    "Arquivo swagger.json não encontrado, usando configuração básica"
  );

  // Fallback: configuração básica do Swagger
  swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "Users Management API",
      version: "1.0.0",
      description: "API para gerenciamento de usuários",
    },
    servers: [
      {
        url: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000",
        description: "API Server",
      },
    ],
    paths: {
      "/": {
        get: {
          summary: "Health Check",
          responses: {
            200: {
              description: "API está funcionando",
            },
          },
        },
      },
    },
  };
}

export { swaggerDocument, swaggerUi };
