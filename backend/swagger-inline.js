// @ts-nocheck
import swaggerUi from "swagger-ui-express";

// Configuração inline do Swagger
const swaggerDocument = {
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

export { swaggerDocument, swaggerUi };
