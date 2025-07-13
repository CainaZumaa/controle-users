// @ts-nocheck
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { join } from "path";

let swaggerDocument;

// Função para tentar carregar o arquivo swagger.json
function loadSwaggerFile() {
  const paths = [
    "./swagger.json",
    "../swagger.json",
    join(process.cwd(), "swagger.json"),
    join(process.cwd(), "..", "swagger.json"),
  ];

  for (const path of paths) {
    try {
      console.log(`🔍 Tentando carregar: ${path}`);
      const content = readFileSync(path, "utf8");
      const parsed = JSON.parse(content);
      console.log(`✅ Arquivo carregado com sucesso: ${path}`);
      return parsed;
    } catch (error) {
      console.log(`❌ Erro ao carregar ${path}:`, error.message);
      // Continua para o próximo caminho
    }
  }
  return null;
}

// Tentar carregar o arquivo primeiro
swaggerDocument = loadSwaggerFile();

// Se não conseguir carregar, usar configuração inline
if (!swaggerDocument) {
  console.log("📝 Usando configuração inline do Swagger");

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
} else {
  console.log("📄 Arquivo swagger.json carregado com sucesso");
}

export { swaggerDocument, swaggerUi };
