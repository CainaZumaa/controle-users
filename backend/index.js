// @ts-nocheck
import express from "express";
import cors from "cors";
import { swaggerDocument, swaggerUi } from "./swagger.js";
import usuarioRoutes from "./src/usuario/route.js";
import authRoutes from "./src/auth/auth.routes.js";
import passwordRoutes from "./src/passwordCheck/passwordRoutes.js";
import modulosRoutes from "./src/modulos/route.js";
import perfilRoutes from "./src/perfis/route.js";
import rolesRoutes from "./src/roles/route.js";
import permissoesRoutes from "./src/permissoes/route.js";
import auditoriaRoutes from "./src/auditoria/route.js";
import comentariosRoutes from "./src/comentarios/route.js";
import errorHandler from "./src/middlewares/errorHandler.js";

const app = express();
const port = 3000;

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"], // Portas
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Permitir credenciais (cookies, authorization headers, etc..)
  })
);

app.use(express.json());

// ROTA VERCEL 🃏
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API de Gerenciamento de Usuários funcionando!",
    version: "1.0.0",
  });
});

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/", passwordRoutes);
app.use("/modulos", modulosRoutes);
app.use("/perfis", perfilRoutes);
app.use("/roles", rolesRoutes);
app.use("/permissoes", permissoesRoutes);
app.use("/auditoria", auditoriaRoutes);
app.use("/comentarios", comentariosRoutes);

// error handler
app.use(errorHandler);

// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    docExpansion: "none",
  })
);
app.listen(port, () => {
  console.log(`\n🚀 Servidor rodando com sucesso em http://localhost:${port}`);
  console.log(`\n--------------------------------------------------`);
  console.log(`📜 Rotas Principais:`);
  console.log(`--------------------------------------------------`);
  console.log(`🔑 Autenticação:`);
  console.log(`  ➡️  POST /auth/login`);
  console.log(`  ➡️  POST /auth/validate`);
  console.log(`  ➡️  POST /auth/check`);
  console.log(`  ➡️  POST /auth/magic`);
  console.log(`\n👤 Usuários:`);
  console.log(`  ➡️  POST /usuarios (criar usuário)`);
  console.log(`  ➡️  GET  /usuarios (listar com filtros)`);
  console.log(`  ➡️  GET  /usuarios/all (listar todos - legado)`);
  console.log(`  ➡️  GET  /usuarios/:id`);
  console.log(`  ➡️  PUT  /usuarios/:id`);
  console.log(`  ➡️  PATCH /usuarios/:id`);
  console.log(`  ➡️  DELETE /usuarios/:id`);
  console.log(`\n🔍 Filtros de Usuários:`);
  console.log(`  ➡️  GET  /usuarios?page=1&limit=10`);
  console.log(`  ➡️  GET  /usuarios?search=joão&status=true`);
  console.log(`  ➡️  GET  /usuarios?orderBy=created_at&orderDirection=desc`);
  console.log(`  ➡️  GET  /usuarios?dataInicio=2024-01-01&dataFim=2024-12-31`);
  console.log(`\n📄 Documentação:`);
  console.log(`  ➡️  GET  /api-docs (Swagger)`);
  console.log(`--------------------------------------------------\n`);
});

export default app;
