import express from "express";
import { AuditoriaController } from "./controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();
const controller = new AuditoriaController();

// Aplicar middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Rota de teste para verificar se a auditoria está funcionando
router.post("/test", async (req, res) => {
  try {
    const log = await controller.criarLog({
      usuario_email: "test@example.com",
      acao: "TEST",
      tabela_afetada: "test",
      dados_novos: { test: true }
    });
    res.json({ success: true, log });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    });
  }
});

// Rotas de auditoria
router.get("/logs", controller.listarLogs);
router.get("/logs/:id", controller.buscarLogPorId);
router.post("/logs", controller.criarLog);
router.get("/usuarios/:email", controller.buscarLogsPorUsuario);
router.get("/acoes", controller.obterAcoesDisponiveis);
router.get("/tabelas", controller.obterTabelasAfetadas);
router.delete("/logs/cleanup", controller.limparLogsAntigos);
router.get("/estatisticas", controller.obterEstatisticas);

export default router;
