// @ts-nocheck
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerFilePath = join(__dirname, "swagger.json");

console.log("🔍 Debug - Caminho do arquivo:", swaggerFilePath);
console.log("🔍 Debug - Diretório atual:", __dirname);
console.log("🔍 Debug - Process CWD:", process.cwd());

let swaggerDocument;

const possiblePaths = [
  swaggerFilePath,
  join(process.cwd(), "swagger.json"),
  "./swagger.json",
  "../swagger.json",
];

let fileFound = false;

for (const path of possiblePaths) {
  try {
    console.log(`🔍 Tentando carregar: ${path}`);
    swaggerDocument = JSON.parse(readFileSync(path, "utf8"));
    console.log(`✅ swagger.json carregado com sucesso de: ${path}`);
    fileFound = true;
    break;
  } catch (error) {
    console.log(`❌ Erro ao carregar ${path}:`, error.message);
    // Continua para o próximo caminho
  }
}

if (!fileFound) {
  console.error("❌ Não foi possível carregar swagger.json de nenhum caminho");
  console.log("📝 Usando configuração inline do Swagger como fallback");

  // Fallback: configuração inline do Swagger
  swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "Users Management API",
      version: "1.0.0",
      description: "API para gerenciamento de usuários com autenticação JWT",
    },
    servers: [
      {
        url: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000",
        description: "API Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      "/": {
        get: {
          summary: "Health Check",
          description: "Verifica se a API está funcionando",
          responses: {
            200: {
              description: "API está funcionando",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "API funcionando",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api-docs": {
        get: {
          summary: "Documentação da API",
          description: "Redireciona para a documentação Swagger",
          responses: {
            200: {
              description: "Documentação carregada",
            },
          },
        },
      },
    },
  };
}

// Exportar o documento (seja o carregado ou o fallback)
export { swaggerDocument, swaggerUi };
