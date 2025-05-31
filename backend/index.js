// @ts-nocheck
import express from "express";
import { swaggerDocument, swaggerUi } from "./swagger.js";
import usuarioRoutes from "./src/usuario/route.js";
import authRoutes from "./src/auth/auth.routes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);

app.use("/", authRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`\n🚀 Servidor rodando com sucesso em http://localhost:${port}`);
  console.log(`\n--------------------------------------------------`);
  console.log(`📜 Rotas Disponíveis:`);
  console.log(`--------------------------------------------------`);
  console.log(`🔑 Autenticação:`);
  console.log(`  ➡️  POST /auth/login`);
  console.log(`  ➡️  POST /auth/validate`);
  console.log(`  ➡️  POST /auth/check`);
  console.log(`\n👤 Usuários:`);
  console.log(`  ➡️  POST /usuarios`);
  console.log(`  ➡️  GET  /usuarios`);
  console.log(`\n📄 Documentação:`);
  console.log(`  ➡️  GET  /api-docs (Swagger)`);
  console.log(`--------------------------------------------------\n`);
});
